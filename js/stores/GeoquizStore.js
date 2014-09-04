var AppDispatcher = require('../dispatcher/AppDispatcher');
var GeoquizConstants = require('../constants/GeoquizConstants');
var GeoquizActions = require('../actions/GeoquizActions');
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');
var CoordinatesManager = require("../../CoordinatesManager");
var CHANGE_EVENT = "change";
var Q = require('q');

var _markers = {};

var cm = new CoordinatesManager({});
function fetchMarker(marker) {
  cm.getCoordinates(marker.formatted_address).then( function(marker){
    GeoquizActions.addMarker(marker);
  });
};

function addMarker(marker) {
  marker.enabled = true;
  _markers[marker.formatted_address] = marker;
};

function update(marker, updates) {
  var id = marker.formatted_address;
  _markers[id] = merge(_markers[id], updates);
};

function removeMarker(marker) {
  delete _markers[marker.formatted_address];
};

var GeoquizStore = merge(EventEmitter.prototype, {
  getAll: function() {
    return _markers;
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register( function(payload) {
  var action = payload.action;
  switch(action.actionType) {
    case GeoquizConstants.MARKER_FETCH:
      fetchMarker(action.marker);
      break;
    case GeoquizConstants.MARKER_ADD:
      addMarker(action.marker);
      break;
    case GeoquizConstants.MARKER_DELETE:
      removeMarker(action.marker);
      break;
    case GeoquizConstants.MARKER_ENABLE:
      update(action.marker, {enabled: true});
      break;
    case GeoquizConstants.MARKER_DISABLE:
      update(action.marker, {enabled: false});
      break;
    default:
      return true;
  };

  GeoquizStore.emitChange();
  return true;
});

module.exports = GeoquizStore;
