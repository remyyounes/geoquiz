var AppDispatcher = require('../dispatcher/AppDispatcher');
var GeoquizConstants = require('../constants/GeoquizConstants');

var GeoquizActions = {
  fetchCoordinates: function(marker) {
    AppDispatcher.handleViewAction({
      actionType: GeoquizConstants.MARKER_FETCH,
      marker: marker
    })
  },
  addMarker: function(marker) {
    AppDispatcher.handleViewAction({
      actionType: GeoquizConstants.MARKER_ADD,
      marker: marker
    })
  },
  removeMarker: function(marker) {
    AppDispatcher.handleViewAction({
      actionType: GeoquizConstants.MARKER_DELETE,
      marker: marker
    })
  }
}

module.exports = GeoquizActions;
