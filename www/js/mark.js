//Map related functions
function generateMap(lat, lng) {
    map = new GMaps({
        div: '#map',
        lat: lat,
        lng: lng,
        zoom: 20
    });
};

function centerMap(lat, lng) {
    map.setCenter(lat, lng);
};

function updateLocation() {
    latitude = map.getCenter().lat();
    longitude = map.getCenter().lng();
};

//Notification bar
function notifyAlert(notifyMessage) {
    clearNotification(); //Clear previous notification
    console.warn('ERROR: ' + errorMessage);
    $('#notification').removeClass('hidden').addClass('alert-danger').text('ERROR: ' + notifyMessage);
};

function notifyInfo(notifyMessage) {
    clearNotification();
    console.warn('NOTIFY: ' + errorMessage);
    $('#notification').removeClass('hidden').addClass('alert-info').text(notifyMessage);
};

function clearNotification() {
    $('#notification').addClass('hidden').removeClass('alert-danger alert-warning alert-info alert-success').text('');
};

//Form related functions 
function revealForm() {
    updateLocation(); //Get position from map
    $('#map-container').addClass('hidden'); //Hide map
    $('#form-red').removeClass('hidden'); //Reveal form
    $('#form-white').removeClass('hidden'); //Reveal form
    clearNotification();
};

//Triggered when user clicks the final submit button
function submitLocation() {
    var rating = getRating() || '';
    var name = $('#name-input').val() || '';
    var comment = $('#comment-input').val() || '';
    fb.push({
        name: name,
        comment: comment,
        rating: rating,
        position: latitude + "," + longitude
    });
    // notifyInfo('Submitted!');
    $('#form-red').addClass('hidden'); //Reveal form
    $('#form-white').addClass('hidden'); //Reveal form
    clearNotification();
    successNotification();
    setTimeout(function() {
        returnHome();
    }, 800);
}

function successNotification() {
    $('.success-banner').toggleClass('hidden');
    setTimeout(function() {
	    $('.check').css('stroke-dashoffset', 0);
    }, 100);
}

function returnHome() {
    $('#home-link')[0].click();
}

function getRating() {
    var rating = ''
    if ($('#option1')[0].checked == true) {
        rating = 1;
    };
    if ($('#option2')[0].checked == true) {
        rating = 2;
    };
    if ($('#option3')[0].checked == true) {
        rating = 3;
    };
    if ($('#option4')[0].checked == true) {
        rating = 4;
    };
    if ($('#option5')[0].checked == true) {
        rating = 5;
    };
    return rating;
}

//Triggered onLoad
function startPageSpecific() {
    $('#loader').addClass('hidden'); //Hide loader button
    $('#map-container').removeClass('hidden'); //Reveal map
    generateMap(0, 0); //Generate a map without waiting for coordinates
    map.setZoom(21);
    endLoad();
};

//Triggered when user presses 'mark location'
function markPressed() {
    updateLocation();
    revealForm();
}

/*function showLocations() {
	for (var i = locations.length - 1; i >= 0; i--) {
		map.addMarker({
		lat: -12.043333,
		lng: -77.028333,
		title: 'Lima',
		click: function(e) {
	alert('You clicked in this marker');
	infoWindow: {
		content: '<p>HTML Content</p>'
	}
	}
		});
	};
}*/

$(document).ready(function() {
    $("#radios").radiosToSlider();
});
