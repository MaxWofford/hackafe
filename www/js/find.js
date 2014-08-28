var results = []

function startPageSpecific() {
};

Math.toRad = function(radians) {
	return (radians * Math.PI/180);
};

function coordsToKilometers (locLat, locLng) {
	
	var a = 6371; // km
	var b = Math.toRad(latitude);
	var c = Math.toRad(locLat);
	var d = Math.toRad(locLat-latitude);
	var e = Math.toRad(locLng-longitude);

	var f = Math.sin(d/2) * Math.sin(d/2) +
		Math.cos(b) * Math.cos(c) *
		Math.sin(e/2) * Math.sin(e/2);
	var g = 2 * Math.atan2(Math.sqrt(f), Math.sqrt(1-f));

	var h = a * g;
	console.log(h);
	return h;
}

function kilometersToMiles(kilometers) {
	return 0.621371 * kilometers;
}

function snapshotFirebase(proximity) {
	fb.on('value', function (snapshot) {
		console.log(snapshot.val());
		for (var location in snapshot.val()) {
			locLat = snapshot.val()[location].position.split(',')[0];
			locLng = snapshot.val()[location].position.split(',')[1];
			var dist = coordsToKilometers (locLat, locLng)

			if (dist <= proximity) {
				console.log(snapshot.val()[location].position, 'is close to you');
				results.push(dist + ':' + snapshot.val()[location].position);
			};
		}
	}, function (errorObject) {
		console.log('The read failed: ' + errorObject.code);
	});
};
