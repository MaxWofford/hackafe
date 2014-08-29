var results = [];

function startPageSpecific() {
	snapshotFirebase(100); //Debugging geolocation is difficult with proxies
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
	var f = Math.sin(d/2) * Math.sin(d/2) + Math.cos(b) * Math.cos(c) * Math.sin(e/2) * Math.sin(e/2);
	var g = 2 * Math.atan2(Math.sqrt(f), Math.sqrt(1-f));
	var h = a * g;
	return h;
}

function kilometersToMiles(kilometers) {
	return 0.621371 * kilometers;
}

function snapshotFirebase(proximity) {
	fb.on('value', function (snapshot) {
		for (var location in snapshot.val()) {
			locLat = snapshot.val()[location].position.split(',')[0];
			locLng = snapshot.val()[location].position.split(',')[1];
			var dist = coordsToKilometers (locLat, locLng);
			if (dist <= proximity) {
				console.info(snapshot.val()[location].position, 'is', dist, 'kilometers from you');
				results.push(dist + ':' + snapshot.val()[location].position);
			};
		}
		displayList(results);
		}, function (errorObject) {
		console.warn('The read failed: ' + errorObject.code);
	});
};

function displayList(results){
	//History is 0 for new and 1 for previously visited
	for (var location in results) {
		var listDist = Math.ceil(results[location].split(':')[0]* 100) / 100;
		//$('#nearby').append($div);
		console.log(listDist);
		var newDiv = document.createElement('div');
		var name = document.createElement('p');
		newDiv.innerHTML = listDist + 'km';
		name.innerHTML = 'cake';
		newDiv.appendChild(document.createElement('hr'));
		newDiv.insertBefore(name, newDiv.firstChild);
		document.getElementById('nearby').appendChild(newDiv);
	}
}