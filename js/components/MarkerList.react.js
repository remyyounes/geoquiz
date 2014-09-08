/** @jsx React.DOM */
var React = require('react');
var ReactPropTypes = React.PropTypes;
var GeoquizActions = require('../actions/GeoquizActions');
var Marker = require('./Marker.react');
var MarkerAdder = require('./MarkerAdder.react');

var MarkerList = React.createClass({
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
      <div className="marker-list">
        <h1>Locations</h1>
        <ul>
          {markers}
          <li>
          </li>
        </ul>
            <MarkerAdder
              onSave={this._onSave}
              placeholder="Type an Address"
            />
      </div>
    );
  },
  _onSave: function(location) {
    marker = { formatted_address: location };
    GeoquizActions.fetchCoordinates(marker);
  }
});

module.exports = MarkerList;
