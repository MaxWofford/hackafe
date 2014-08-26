function startLoad() {
	$('#loading-background').removeClass('hidden');
};

function endLoad() {
	$('#loading-background').addClass('hidden');
};

//Anything onLoad goes here
function startPage() {
	startLoad();
	findLocation();
};