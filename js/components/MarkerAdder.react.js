/** @jsx React.DOM */
var React = require('react');
var ReactPropTypes = React.PropTypes;
var GeoquizActions = require('../actions/GeoquizActions');

var ENTER_KEY = 13;

var MarkerAdder = React.createClass({
  propTypes: {
    placeholder: ReactPropTypes.string,
    value: ReactPropTypes.string,
    onSave: ReactPropTypes.func.isRequired
  },
  getInitialState: function() {
    return {
      value: this.props.value || ''
    }
  },
  render: function (){
    return (
      <input
        type="text"
        value={this.state.value}
        placeholder={this.props.placeholder}
        onKeyDown={this._onKeyDown}
        onChange={this._onChange}
      />
    );
  },
  _onChange: function(event) {
    this.setState({
      value: event.target.value
    });
  },
  _onKeyDown: function(event) {
    if(event.keyCode === ENTER_KEY){
      this._save();
    }
  },
  _save: function() {
    this.props.onSave(this.state.value);
    this.setState({ value:''});
  }
});

module.exports = MarkerAdder;
