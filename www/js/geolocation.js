var fb = new Firebase("https://hackafe.firebaseio.com/submit/");

latitude = 0;
longitude = 0;

var options = {
	enableHighAccuracy: true,
	timeout: 50000, // While localhosting this is set to 50000
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
};

function findLocation() {
	if ("geolocation" in navigator) {
		navigator.geolocation.getCurrentPosition(success, error, options);
	} else{//Geolocation not in navigator
		notifyAlert('Geolocation not found in navigator');
	};
};