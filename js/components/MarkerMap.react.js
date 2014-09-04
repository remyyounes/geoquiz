/** @jsx React.DOM */
var React = require('react');
var ReactPropTypes = React.PropTypes;
var GeoquizActions = require('../actions/GeoquizActions');
var GeoquizStore = require('../stores/GeoquizStore');
var Marker = require('./Marker.react');

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
      var mapMarker = toMapMarker(marker, map);
      mapMarker.setMap(map);
    }
    return mapMarker;
  },
  updateMarkers: function(updatedMarkers) {
    debugger;
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
        className="map"
        style={style}
      />);
  },
  componentDidMount: function() {
    GeoquizStore.addChangeListener(this._onChange);
    window.mapLoaded = (function(){
      var mapCenter = new google.maps.LatLng( -4.422175, 3.3605883999999833);
      var mapOptions = {
        zoom: 2,
        center: mapCenter,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map( this.getDOMNode(), mapOptions);
      this.setState({map: map});
    }).bind(this);

    var mapScript = document.createElement('script');
    mapScript.src = [
      'https://maps.googleapis.com/maps/api/js?sensor=false',
      // '&key=', this.props.gmaps_api_key,
      '&callback=mapLoaded'
    ].join("");
    document.head.appendChild( mapScript );

  },
  _onChange: function(){
    this.setState(getMarkerMapState());
    this.updateMarkers(this.state.allMarkers);
  }
});

module.exports = MarkerMap;
