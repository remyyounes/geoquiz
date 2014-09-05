/** @jsx React.DOM */
var MarkerMap = require('./MarkerMap.react');
var React = require('react');
var GeoquizStore = require('../stores/GeoquizStore');

window.onGoogleMapLoaded = function(){
  var callbacks = window.googleMapCallbacks || [];
  for (var i = 0; i < callbacks.length; i++) {
    callbacks[i]();
  }
}

function getQuizState() {
  return {
    // marquerQuestion: Geoquiz.getMarquerQuestion(),
    // marquerAnswer: Geoquiz.getMarquerAnswer(),
    // score: Geoquiz.getScore()
  };
}

var Quiz = React.createClass({
  getInitialState: function() {
    return getQuizState();
  },
  render: function() {
    var style = {
      width: "calc(100% - 400px)",
      height: "100vh"
    }
    return (
      <div
        className="quizmap"
        style={style}
      />
    );
  },
  componentDidMount: function() {
    // GeoquizStore.addChangeListener(this._onChange);
    window.quizMapLoaded = (this._quizMapLoaded).bind(this);
    this.insertGoogleMapScript(quizMapLoaded);
  },
  _quizMapLoaded: function(){
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
  addGooglemapCallback: function(callback) {
    window.googleMapCallbacks = window.googleMapCallbacks || [];
    window.googleMapCallbacks.push(callback);
  },
  insertGoogleMapScript: function(callback) {
    debugger;
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
  // _onChange: function(){
  //   this.setState(getMarkerMapState());
  //   this.updateMarkers(this.state.allMarkers);
  // }
});

module.exports = Quiz;
