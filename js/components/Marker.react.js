/** @jsx React.DOM */
var React = require('react');
var ReactPropTypes = React.PropTypes;
var GeoquizActions = require('../actions/GeoquizActions');

var Marker = React.createClass({
  propTypes: {
    marker: ReactPropTypes.object.isRequired
  },
  getInitialState: function() {
    return {
      formatter_address: false
    };
  },
  render: function() {
    var marker = this.props.marker;
    return (
      <li className="marker">
        {marker.formatted_address}
        <button>delete</button>
      </li> );
  }
});

module.exports = Marker;
