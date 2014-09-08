/** @jsx React.DOM */
var React = require('react');
var ReactPropTypes = React.PropTypes;
var GeoquizActions = require('../actions/GeoquizActions');
var GeoquizStore = require('../stores/GeoquizStore');
var Marker = require('./Marker.react');

window.onGoogleMapLoaded = function(){
  var callbacks = window.googleMapCallbacks || [];
  for (var i = 0; i < callbacks.length; i++) {
    callbacks[i]();
  }
}

var toMapMarker = function(marker, map){
  var location = new google.maps.LatLng(
    marker.geometry.location.lat(),
    marker.geometry.location.lng()
  );
  var mapMarker = new google.maps.Marker({
      position: location,
      map: map,
      title: marker.formatted_address
  });
  return mapMarker;
};

function getMarkerMapState() {
  return {
    allMarkers: GeoquizStore.getAll()
  };
}

var MarkerMap = React.createClass({
  propTypes: {
    allMarkers: ReactPropTypes.object.isRequired
  },
  getInitialState: function() {
    return {
      map: null,
      allMarkers: {},
      mapMarkers: []
    };
  },
  removeMapMarkers: function() {
    var gMarkers = this.state.mapMarkers;
    for(var key in gMarkers) {
      gMarkers[key].setMap(null);
    }
    gMarkers = [];
  },
  addMapMarkers: function(markers) {"use strict";
    var mapMarkers = [];
    var mapMarker = null;
    for(var key in markers) {
      mapMarker = this.addMapMarker(markers[key]);
      if(mapMarker) mapMarkers.push( mapMarker );
    }
    return mapMarkers;
  },
  addMapMarker: function(marker) {
    var mapMarker = null;
    var map = this.state.map;
    if(marker.enabled) {
      mapMarker = toMapMarker(marker, map);
    }
    return mapMarker;
  },
  updateMarkers: function(updatedMarkers) {
    var markers = this.state.allMarkers;
    var map = this.state.map;
    var marker = null;
    var mapMarkers = null;

    this.removeMapMarkers();
    this.state.allMarkers = {};

    mapMarkers = this.addMapMarkers(updatedMarkers);

    this.setState({
      allMarkers: updatedMarkers,
      mapMarkers: mapMarkers
    });
  },
  render: function() {
    var style = {
      width: "calc(100% - 400px)",
      height: "100vh"
    }
    return (
      <div
        className="markermap"
        style={style}
      />);
  },
  componentDidMount: function() {
    GeoquizStore.addChangeListener(this._onChange);
    window.markerMapLoaded = (this._markerMapLoaded).bind(this);
    this.insertGoogleMapScript(markerMapLoaded);
  },
  addGooglemapCallback: function(callback) {
    window.googleMapCallbacks = window.googleMapCallbacks || [];
    window.googleMapCallbacks.push(callback);
  },
  _markerMapLoaded: function(){
    window.isGmapLoaded = true;
    var mapCenter = new google.maps.LatLng( -4.422175, 3.3605883999999833);
    var mapOptions = {
      zoom: 2,
      center: mapCenter,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map( this.getDOMNode(), mapOptions);
    this.setState({map: map});
  },
  insertGoogleMapScript: function(callback) {
    if (document.getElementById('gmapScript')){
      if(window.isGmapLoaded) {
        callback();
      }else{
        this.addGooglemapCallback(callback);
      }
    }else{
      this.addGooglemapCallback(callback);
      var mapScript = document.createElement('script');
      mapScript.id = 'gmapScript';
      mapScript.src = [
        'https://maps.googleapis.com/maps/api/js?sensor=false',
        // '&key=', this.props.gmaps_api_key,
        '&callback=onGoogleMapLoaded'
      ].join("");
      document.head.appendChild( mapScript );
    }
  },
  _onChange: function(){
    var newState = getMarkerMapState()
    this.setState(newState);
    this.updateMarkers(this.state.allMarkers);
  }
});

module.exports = MarkerMap;
