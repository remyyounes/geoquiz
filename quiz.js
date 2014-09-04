;(function(){
  var Geoquiz = window.Geoquiz = function(params){
    this.score = {};
    this.el = params.el;
    this.map = params.map;
    this.places = params.places
    this.currentPlaceIndex = null;
    this.scoreEl = null;
    this.answerMarker = null;
    this.guessMarker = null;
    this.distancePath = null;
    this.init();
  };

  Geoquiz.prototype.init = function(){
    this.scoreEl = this.el.querySelector(".score");
    this.questionEl = this.el.querySelector(".question");
    this.attachEventListeners();
  };

  Geoquiz.prototype.startGame = function(){
    this.resetScore();
    this.nextQuestion();
  };

  Geoquiz.prototype.nextQuestion = function(){
    var place = this.getPlace();
    this.showQuestion(place.title);
  };

  Geoquiz.prototype.showQuestion = function(question){
    this.questionEl.innerHTML = question;
  };

  Geoquiz.prototype.resetScore = function(){
    this.score = {};
    this.renderScore();
  };

  Geoquiz.prototype.updateScore = function(answer){
    if(answer){
      this.score.good += 1
      // this.getCurrentPlace().score.
    }else{
      this.score.bad += 1
    }
    this.renderScore();
  };

  Geoquiz.prototype.renderScore = function(){
    this.scoreEl.innerHTML = "Score:" + "0";
  };

  Geoquiz.prototype.getPlace = function(){
    var len = this.places.length;
    this.currentPlaceIndex = this.getNextPlaceIndex();
    // this.currentPlaceIndex = Math.floor(Math.random() * len);
    return this.places[this.currentPlaceIndex];
  };

  Geoquiz.prototype.getNextPlaceIndex = function(){
    return this.currentPlaceIndex+1 >= this.places.length ? 0 : this.currentPlaceIndex+1;
  };

  Geoquiz.prototype.hideMarkers = function(){
    this.guessMarker && this.guessMarker.setMap(null);
    this.answerMarker && this.answerMarker.setMap(null);
    this.distancePath && this.distancePath.setMap(null);
  };
  Geoquiz.prototype.hideMarker = function(marker){

  };

  Geoquiz.prototype.showAnswer = function(guessLatLng, answerLatLng){
    var itinerary = [ guessLatLng, answerLatLng ];
    this.showPath( itinerary );
    this.guessMarker = this.addMarker(guessLatLng);
    this.answerMarker = this.addPlaceMarker(this.getCurrentPlace());
  };

  Geoquiz.prototype.hideGuess = function(){

  };

  Geoquiz.prototype.hideMarker = function(marker){

  };

  Geoquiz.prototype.getPlaceLatLng = function(place){
    var p = this.getCurrentPlace();
    var latLng = new google.maps.LatLng(p.lat, p.lng);
    return latLng;
  };

  Geoquiz.prototype.getCurrentPlace = function(){
    return this.places[this.currentPlaceIndex];
  }

  Geoquiz.prototype.attachEventListeners = function(){
    var geoQuiz = this;
    google.maps.event.addListener(this.map, "click", function(event) {
      var latLng = new google.maps.LatLng(
        event.latLng.lat(),
        event.latLng.lng()
      );
      geoQuiz.hideMarkers()
      geoQuiz.guess(latLng);
    });
  }

  Geoquiz.prototype.guess = function(latLng){
    var placeLatLng = this.getPlaceLatLng(this.getCurrentPlace());
    var distance = google.maps.geometry.spherical.computeDistanceBetween(
      latLng,
      placeLatLng
    );

    this.showAnswer(latLng, placeLatLng);

    var distanceKM = distance / 1000;
    var goodAnswer = distanceKM < 1000;
    this.updateScore(goodAnswer);
    this.nextQuestion();
  };

  Geoquiz.prototype.showPath = function(itinerary){
    this.distancePath = new google.maps.Polyline({
      path: itinerary,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    this.distancePath.setMap(this.map);

  }
  Geoquiz.prototype.addMarker = function(latLng, title, color){
    var marker = new google.maps.Marker({
        position: latLng,
        map: this.map,
        title: title
    });

    marker.setIcon(this.getMarkerIcon(color));

    return marker;
  };

  Geoquiz.prototype.getMarkerIcon = function(color){
    var icon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
    if ( color === 'green' ){
      icon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
    }
    return icon;
  };


  Geoquiz.prototype.addPlaceMarker = function(place){
    var latLng = new google.maps.LatLng(
        place.lat,
        place.lng
    );
    return this.addMarker(latLng, place.title, "green");

  }




})();
