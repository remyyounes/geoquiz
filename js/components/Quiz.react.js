/** @jsx React.DOM */
var MarkerMap = require('./MarkerMap.react');
var React = require('react');
var GeoquizStore = require('../stores/GeoquizStore');
var GeoquizActions = require('../actions/GeoquizActions');

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
    return (
      <div className="quiz">
        <h1>Quiz</h1>
        <button onClick={this._startQuizClick}>Clear Marker</button>
      </div>
    );
  },
  _startQuizClick: function(){
    GeoquizActions.startQuiz();
  }
  // _onChange: function(){
  //   this.setState(getMarkerMapState());
  //   this.updateMarkers(this.state.allMarkers);
  // }
});

module.exports = Quiz;
