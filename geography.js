var gMap,
  places = [
// {"lat":36.625604,"lng":114.539085,"title":"handan, china"},
// {"lat":39.747662,"lng":37.01787899999999,"title":"Sivas, Turkey"},
// {"lat":-2.5781167,"lng":150.80860819999998,"title":"Kavieng, PaPua New Guinea"},
// {"lat":67.2803556,"lng":14.404915999999957,"title":"Bodo, Norway"},
// {"lat":-4.1,"lng":-81.05000000000001,"title":"Mancora, Peru"},
// {"lat":43.825592,"lng":87.616848,"title":"Urumqi, China"},
// {"lat":22.3038945,"lng":70.80215989999999,"title":"Rajkot, India"},
// {"lat":56.327358,"lng":43.985190999999986,"title":"Nizhny Novgorod, Russia"},
// {"lat":26.9157487,"lng":70.90834429999995,"title":"Jaisalmer, India"},
// {"lat":-20.7247053,"lng":139.49746159999995,"title":"Mount Isa, Australia"},
// {"lat":7.3419444,"lng":134.47916669999995,"title":"Koror City, Palau"},
// {"lat":26.489749,"lng":74.55108559999996,"title":"Pushkar, India"},
// {"lat":26.8482909,"lng":56.371232700000064,"title":"Larak Island, Iran"},
// {"lat":55.1699396,"lng":-118.79861519999997,"title":"Grande Prairie, Canada"},
// {"lat":26.1445169,"lng":91.73623650000002,"title":"Guahati, India"},
// {"lat":4.5833333,"lng":13.683333299999958,"title":"Bertoua, Cameroon"},
// {"lat":3.5124436,"lng":34.133721899999955,"title":"Kaabong, Uganda"},
// {"lat":46.8852,"lng":-56.3159,"title":"St Pierre & Miquelon"},
// {"lat":-15.92213,"lng":-5.704682000000048,"title":"Jamestown, St helena"},
//
// {"lat":70.0745056,"lng":29.748118100000056,"title":"Vadso, Norway"},
// {"lat":-12.5419553,"lng":27.854586700000027,"title":"Chingola, Zambia"},
// {"lat":-43.1389743,"lng":147.85069399999998,"title":"Port Arthur, Australia"},
// {"lat":69.6407395,"lng":18.902755500000012,"title":"Jan Mayen, Norway"},
// {"lat":52.312222,"lng":104.29583300000002,"title":"Irkutsk, Russia"},
// {"lat":57.0488195,"lng":9.921746999999982,"title":"Aalborg Denmark"},
// {"lat":4.175278,"lng":73.50888899999995,"title":"Male, Maldives"},
// {"lat":-29.0132437,"lng":134.75448189999997,"title":"Coober Pedy, Australia"},
// {"lat":-9.7546726,"lng":-139.0211225,"title":"Hiva Oa, Marquesas Islands"},
// {"lat":-31.4657557,"lng":151.1259867,"title":"Nundle, Australia"},
// {"lat":-12.188713,"lng":96.82939599999997,"title":"Coco Islands, Australia"},

{"lat":-54.422175,"lng":3.3605883999999833,"title":"Bouvet Island, Norway"},
{"lat":48.48333299999999,"lng":135.06666700000005,"title":"Khabarovsk, russia"},
{"lat":24.880095,"lng":102.83289200000002,"title":"Kumming, China"},
{"lat":5.3095618,"lng":162.9814877,"title":"Kosrae, Micronesia"},
{"lat":68.966667,"lng":33.08333300000004,"title":"Murmansk, Russia"},
{"lat":56.833333,"lng":60.58333300000004,"title":"Yekaterinburg, Russia"},
{"lat":57.6011371,"lng":49.12193709999997,"title":"Petropavlovsk, russia"},
{"lat":-11.7172157,"lng":43.24731459999998,"title":"Moroni, Comoros"},
{"lat":-30.0346471,"lng":-51.217658400000005,"title":"Porto Alegre, Brazil"},
{"lat":-27.1211919,"lng":-109.36642369999998,"title":"Rapa Nui, Easter Island"},
];



window.onload = function () {
  var answerMarker = null;
  var mapEl = document.getElementById("map");
  var quizContainer = document.getElementById("quiz");
  var geocoder =  new google.maps.Geocoder();
  var centerPosition = new google.maps.LatLng(40.747688, -74.004142);
  var options = {
      zoom: 1,
      center: centerPosition,
      mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  mapEl.style.width = window.innerWidth + "px";
  mapEl.style.height = window.innerHeight + "px";
  // document.body.appendChild(mapEl);
  var gMap = new google.maps.Map(mapEl, options);
  var quiz = new GeoQuiz({
    el: quizContainer,
    places: places,
    map: gMap
  });
  quiz.startGame();

  // for(var i = 0; i<places.length; i++){
  //     var place = places[i];
  //     quiz.addMarker(place);
  // }
}
