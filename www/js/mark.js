// Initialization stuff
var fb = new Firebase("https://hackafe.firebaseio.com");
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;
  console.log('Your current position is:');
  console.log('Latitude : ' + crd.latitude);
  console.log('Longitude: ' + crd.longitude);
  console.log('More or less ' + crd.accuracy + ' meters.');
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


function clearNotification() {
	$('#notification').addClass('hidden').text('');
}