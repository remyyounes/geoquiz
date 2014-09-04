/** @jsx React.DOM */
var React = require('react');
var ReactPropTypes = React.PropTypes;
var GeoquizActions = require('../actions/GeoquizActions');
var Marker = require('./Marker.react');

var MarkerMap = React.createClass({
  propTypes: {
    allMarkers: ReactPropTypes.object.isRequired
  },
  render: function() {
    var allMarkers = this.props.allMarkers;
    var markers = [];
    for (var key in allMarkers) {
      markers.push(<Marker key={key} marker={allMarkers[key]} />);
    }
    return (
      <div>
        <h1>map</h1>
        <ul>
          {markers}
        </ul>
      </div>
    );
  }
});

module.exports = MarkerMap;
