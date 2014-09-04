// =====================
// =====================
//  COORDINATES MANAGER
// =====================
// =====================

var geocoder;
var Q = require('q');

var getGeocoder = function() {
  return geocoder || new google.maps.Geocoder();
}
var CoordinatesManager = function(params) {
  this.locations = params.locations;
  this.requestDelay = params.requestDelay || 500,
  this.init();
  // this.getAllCoordinates(this.locations);
};

CoordinatesManager.prototype.init = function(params) {
  this.markers = {};
};

CoordinatesManager.prototype.addMarker = function(marker) {
  this.markers[marker.formatted_address] = marker;
  return marker;
};

CoordinatesManager.prototype.clearMarkers = function(marker) {
  this.markers = {};
};

CoordinatesManager.prototype.addressResultHandler = function(results, status) {
  var marker = results[0];
  if (status == google.maps.GeocoderStatus.OK) {
    return this.addMarker(marker);
  }else{
    Utils.methodError("addressResultHandler", arguments, status)
  }
  return null;
};

CoordinatesManager.prototype.getCoordinates = function(address) {
  var deferred = Q.defer();
  var cm = this;

  getGeocoder().geocode( {address: address} , function(results, status) {
    var marker = cm.addressResultHandler(results, status);
    deferred.resolve(marker);
  });
  return deferred.promise;
};

CoordinatesManager.prototype.getAllCoordinates = function(locations) {
  var cm = this;
  var requestFunctions = locations.map( function(location){
    return function(){ cm.getCoordinates(location); };
  });
  var promise = Utils.promiseSequence(requestFunctions, this.requestDelay);
};


// =======
// =======
//  UTILS
// =======
// =======

var Utils = {
  promiseSequence: function(functions, delay){
    var delayFunction = function(){ return Utils.delayChain(delay) };
    var promise = functions.reduce(
      function (promiseSoFar, nextFunction) {
        return (
          promiseSoFar
          .then(delayFunction)
          .then(nextFunction)
        )
      }, Q.delay(0));
    return promise;
  },
  curry: function(fn) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function curryed() {
      return fn.apply(this, args.concat(Array.prototype.slice.call(arguments)));
    };
  },
  delayChain: function(delay) {
    var deferred = Q.defer();
    setTimeout(function() { deferred.resolve();}, delay);
    return deferred.promise;
  },
  methodError: function(method, args, status){
    console.error(
      "Error in method:", method,
      "with args:", args,
      "and status:", status
    );
  }
};


module.exports = CoordinatesManager;
