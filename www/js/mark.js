// Initialization stuff
var fb = new Firebase("https://hackafe.firebaseio.com/submit/cafe/");
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  console.log('finding location')
  var crd = pos.coords;
  latitude = crd.latitude;
  longitude = crd.longitude;
  console.log('Your current position is:');
  console.log('Latitude : ' + latitude);
  console.log('Longitude: ' + longitude);
};

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
  $('#notification').removeClass('hidden').text('ERROR(' + err.code + '): ' + err.message);
};

function findLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(success, error, options);
  } else{ //Geolocation not in navigator
    console.warn('ERROR: Geolocation not found in navigator');
    $('#notification').removeClass('hidden').text('ERROR: Geolocation not found in navigator');
  };
};

function updateLocation() {
  latitude = map.getCenter().lat();
  longitude = map.getCenter().lng();
}
// When user clicks "submit"
function submitLocation() {
  // Get user input for Firebase
  name = $('#nameInput').val();
  comments = $('#commentInput').val();
  //  Check if map.getCenter() data is valid, then update lat and lng
  if ($.isNumeric(map.getCenter().lat() + map.getCenter().lng()) && map.getCenter().lat() + map.getCenter().lng() != 0) {
    latitude = map.getCenter().lat();
    longitude = map.getCenter().lng();
  };
  // Push data to Firebase
  fb.push({name: name, comments: comments, lat: latitude, lng: longitude});
};

function clearNotification() {
  $('#notification').addClass('hidden').removeClass('alert-danger alert-warning alert-info alert-success').text('');
};

//Map related functions
function createMap() {
  // Generate map in #map
  map = new GMaps({
    div: '#map',
    lat: latitude,
    lng: longitude,
    zoom: 19
  });
  // Hide loading button
  $('#loader').addClass('hidden');
  //Reveal the center-marker
  $('#center-marker').removeClass('hidden');
  $('#mark-button').removeClass('hidden');
};

function hideMap() {
  $('#map').addClass('hidden');
  $('#center-marker').addClass('hidden');
  $('#mark-button').addClass('hidden');
};

function revealForm() {
  hideMap();
  clearNotification();
  updateLocation();
  $('#submit-form').removeClass('hidden');
  $('#notification').removeClass('hidden').addClass('alert-success').text('Ready to mark at ' + latitude + ', ' + longitude);
};
