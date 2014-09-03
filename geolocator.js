var output = document.getElementById("output");

var delayChain = function(){
    var deferred = Q.defer();
    setTimeout(function() {deferred.resolve();}, 600);
    return deferred.promise;
}

var geocoder =  new google.maps.Geocoder();
var getCoordinates = function(address){

    var deferred = Q.defer();
    geocoder.geocode( {address: address} , function(results, status) {

        if (status == google.maps.GeocoderStatus.OK) {
            marker = {
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng(),
                title: address
            };
        }else{
            console.log(status);
        }
        output.innerHTML += JSON.stringify(marker) + "," ;
        deferred.resolve();
    });
    return deferred.promise;
}

var places = [
    "handan, china",
    "Sivas, Turkey",
    "Kavieng, PaPua New Guinea",
    "Bodo, Norway",
    "Mancora, Peru",
    "Urumqi, China",
    "Rajkot, India",
    "Nizhny Novgorod, Russia",
    "Jaisalmer, India",
    "Mount Isa, Australia",
    "Koror City, Palau",
    "Pushkar, India",
    "Larak Island, Iran",
    "Grande Prairie, Canada",
    "Guahati, India",
    "Bertoua, Cameroon",
    "Kaabong, Uganda",
    "St Pierre & Miquelon",
    "Jamestown, St helena"
];

var queue = [];
var promise = Q.delay(1);
for( var i = 0; i < places.length; i++){
    var getCoords = function(){ return getCoordinates(places[this]);}.bind(i);
    promise = promise.then( getCoords ).then( delayChain );
}

var promise = Q.all(queue);
