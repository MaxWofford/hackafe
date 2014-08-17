// Initialization stuff
var fb = new Firebase("https://hackafe.firebaseio.com/submit/cafe/");
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;
  latitude = crd.latitude;
  longitude = crd.longitude;
  console.log('Your current position is:');
  console.log('Latitude : ' + latitude);
  console.log('Longitude: ' + longitude);
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

function submitLocation(latitude, longitude) {
  name = $('#nameInput').val();
  comments = $('#commentInput').val();
  console.log(latitude);
  if (longitude = latitude) {
    $('#notification').removeClass('hidden').addClass('ERROR: Longitude and latitude = 0');
  } else{
    fb.push({name: name, comments: comments, lat: latitude, long: longitude});
  };
};

function clearNotification() {
	$('#notification').addClass('hidden').removeClass('alert-danger alert-warning alert-info alert-success').text('');
};