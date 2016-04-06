;(function()
{

function main()
{
	// Initialise UI.
	phonon.options({
		navigator: {
			defaultPage: 'home',
			//templateRootDirectory: 'contents/',
			//enableBrowserBackButton: true, // should be disabled on Cordova
			animatePages: true
		}
	});
	var app = phonon.navigator();
	app.start();

	// Start scanning beacons.
	initialize();
}

function initialize()
{
	$('.evo-menu-tracking').click(function() {
		location.assign('asset-tracker.html');
	});
	$('.evo-menu-handling').click(function() {
		location.assign('material-handling.html');
	});
	$('.evo-menu-assembly').click(function() {
		location.assign('work-order.html');
	});
}

main();

})();
