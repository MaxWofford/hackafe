// Example api request https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452

var fb = new Firebase("https://hackafe.firebaseio.com/submit/");

fb.on('child_added', function (snapshot) {
	var cafeLocation = snapshot.val();
	console.log("Latitude: " + cafeLocation.longitude);
	console.log("Longitude: " + cafeLocation.latitude);
});

latitude = 0;
longitude = 0;

//Geolocation options and callbacks
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
	centerMap(latitude,longitude);
};

function error(err) {
	console.warn('ERROR(' + err.code + '): ' + err.message);
};

//Geolocation function
function findLocation() {
	if ("geolocation" in navigator) {
	navigator.geolocation.getCurrentPosition(success, error, options);
	} else{//Geolocation not in navigator
	console.log('Geolocation not found in navigator');
	};
};

