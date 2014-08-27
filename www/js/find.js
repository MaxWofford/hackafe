function startPageSpecific() {
};

var results = []
function snapshotFirebase(proximity) {
	fb.on('value', function (snapshot) {
		console.log(snapshot.val());
		for (var location in snapshot.val()) {
			locLat = snapshot.val()[location].position.split(',')[0];
			locLng = snapshot.val()[location].position.split(',')[1];
			distLat = locLat - latitude;
			distLng = locLng - longitude
			if (Math.sqrt(distLat + distLng) <= proximity) {
				console.log(snapshot.val()[location].position, 'is close to you');
				results.push(snapshot.val()[name] + ':' + snapshot.val()[location].position);
			};
		}
	}, function (errorObject) {
		console.log('The read failed: ' + errorObject.code);
	});
};