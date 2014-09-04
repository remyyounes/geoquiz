/** @jsx React.DOM */

var React = require('react');

var GeoquizApp = require('./components/GeoquizApp.react');

React.renderComponent(
  <GeoquizApp />,
  document.getElementById('geoquizapp')
);
