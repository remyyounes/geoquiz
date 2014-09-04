/** @jsx React.DOM */
var React = require('react');
var ReactPropTypes = React.PropTypes;
var GeoquizActions = require('../actions/GeoquizActions');
var cx = require('react/lib/cx');


var Marker = React.createClass({
  propTypes: {
    marker: ReactPropTypes.object.isRequired
  },
  getInitialState: function() {
    return {
      formatter_address: false,
      enabled: true
    };
  },
  render: function() {
    var marker = this.props.marker;
    return (
      <li className={cx({
        'marker': true,
        'enabled': marker.enabled,
        'disabled': !marker.enabled
      })}
      >
        <label
          onClick={this._onClickLabel}>
          {marker.formatted_address}
        </label>
        <button onClick={this._onClickDelete}>
          delete
        </button>
      </li>
    );
  },
  _onClickLabel: function() {
    GeoquizActions.toggleEnabled(this.props.marker);
  },
  _onClickDelete: function() {
    GeoquizActions.removeMarker(this.props.marker);
  }
});

module.exports = Marker;
