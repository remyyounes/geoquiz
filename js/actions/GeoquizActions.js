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
  }
}

module.exports = GeoquizActions;
