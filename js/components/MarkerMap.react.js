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
      googleMarkers: []
    };
  },

  updateMarkers: function(updatedMarkers) {
    debugger;
    var markers = this.state.allMarkers;
    var googleMarkers = this.state.googleMarkers;
    var map = this.state.map;
    for(var key in googleMarkers) {
      googleMarkers[key].setMap(null);
    }
    this.state.allMarkers = {};
    this.state.googleMarkers = [];

    var marker = null;
    for(key in updatedMarkers) {
      marker = toMapMarker(updatedMarkers[key], map);
      marker.setMap(map);
      googleMarkers.push( marker );
    }
    this.setState({allMarkers: updatedMarkers});
  },
  render: function() {
    var style = {
      width: 800,
      height: 600
    }
    return ( <div style={style}> </div> );
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
