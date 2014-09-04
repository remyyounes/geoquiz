/** @jsx React.DOM */
var MarkerList = require('./MarkerList.react');
var MarkerMap = require('./MarkerMap.react');
var React = require('react');
var GeoquizStore = require('../stores/GeoquizStore');

/**
 * Retrieve the current Geoquiz data from the GeoquizStore
 */
function getGeoquizState() {
  return {
    allMarkers: GeoquizStore.getAll()
  };
}

var GeoquizApp = React.createClass({

  getInitialState: function() {
    return getGeoquizState();
  },

  componentDidMount: function() {
    GeoquizStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    GeoquizStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {
  	return (
      <div>
        <MarkerList
          allMarkers={this.state.allMarkers}
        />
        <MarkerMap
          allMarkers={this.state.allMarkers}
        />
      </div>
  	);
  },

  /**
   * Event handler for 'change' events coming from the GeoquizStore
   */
  _onChange: function() {
    this.setState(getGeoquizState());
  }

});

module.exports = GeoquizApp;
