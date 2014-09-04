/** @jsx React.DOM */
var MarkerMap = require('./MarkerMap.react');
var React = require('react');
// var GeoquizStore = require('../stores/GeoquizStore');

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
      <div className="quiz">Quiz</div>
    );
  }
});

module.exports = Quiz;
