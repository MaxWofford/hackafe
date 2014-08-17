// Initialization stuff
var fb = new Firebase("https://hackafe.firebaseio.com");
var latitude = 0;
var longitude = 0;
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;
  var latitude = crd.latitude;
  var longitude = crd.longitude;
  console.log('Your current position is:');
  console.log('Latitude : ' + crd.latitude);
  console.log('Longitude: ' + crd.longitude);
  console.log('More or less ' + crd.accuracy + ' meters.');
  $('#notification').removeClass('hidden').addClass('alert-success').text('Ready to mark at ' + crd.latitude + ', ' + crd.longitude);
};

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
  $('#notification').removeClass('hidden').text('ERROR(' + err.code + '): ' + err.message);
};

// onClick
function findLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(success, error, options);
  } else{ //Geolocation not in navigator
    console.warn('ERROR: Geolocation not found in navigator');
    $('#notification').removeClass('hidden').text('ERROR: Geolocation not found in navigator');
  };
};

function submitLocation(pos) {
  var name = $('nameInput').val()
  var comments = $('commentInput').val()
  if (latitude = 0 && longitude = 0) {
    $('#notification').removeClass('hidden').text('ERROR: Latitude and Longitude = 0');
  } else{
    fb.set({lat: latitude, long: longitude, name: name, comments: comments});
  };
};

function clearNotification() {
	$('#notification').addClass('hidden').removeClass('alert-danger alert-warning alert-info alert-success').text('');
};