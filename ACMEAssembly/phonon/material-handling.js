;(function()
{

// Beacon monitor.
var monitor = null;

// Timer that displays list of beacons.
var updateTimer = null;

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
	if (window.cordova)
	{
		document.addEventListener(
			'deviceready',
			function() { evothings.scriptsLoaded(onDeviceReady) },
			false);
	}
	else
	{
		onDeviceReady()
	}
}

function onDeviceReady()
{
	$('.evo-menu-tracking').click(function() {
		location.assign('asset-tracker.html');
	});

	monitor = createBeaconMonitor();

	// Start tracking beacons.
	setTimeout(monitor.startScan, 500);

	// Display refresh timer.
	updateTimer = setInterval(displayBeaconList, 500);
}

function displayBeaconList()
{
	// Clear beacon list.
	$('.beacon-list').empty();

	// Update beacon list.
	var beacons = monitor.getSortedBeaconList();
	var timeNow = Date.now();
	$.each(beacons, function(index, beacon)
	{
		// Only show beacons that are updated during the last 60 seconds.
		// TODO: Move removal to monitor object.
		if (beacon.timeStamp + 60000 > timeNow)
		{
			// Create HTML to display beacon data.
			var element = $(
				'<li>'
				+	beacon.name + ' ' +
				+	beacon.rssi
				+ '</li>'
			);

			$('.beacon-list').append(element);
		}
	});
}

function createFakeBeacon()
{
	var beacon = {};
	beacon.timeStamp = Date.now();
	beacon.address = 'BEACON_' + Math.random();
	beacon.rssi = Math.random() * -100;
	beacon.name = beacon.address;
	return beacon;
}

function createBeaconMonitor()
{
	var monitor = {};

	// Dictionary of beacons.
	var beacons = {};

	monitor.createFake = function()
	{
		var beacon = createFakeBeacon();
		beacons[beacon.address] = beacon;
	}

	for (var i = 0; i < 3; ++i) { monitor.createFake(); }

	monitor.startScan = function()
	{
		// Called continuously when scanning for beacons.
		evothings.eddystone.startScan(
			function(beacon)
			{
				// Insert/update beacon table entry.
				beacon.timeStamp = Date.now();
				beacons[beacon.address] = beacon;
			},
			function(error)
			{
				console.log('Eddystone Scan error: ' + JSON.stringify(error));
			});
	}

	/**
	 * Map the RSSI value to a value between 1 and 100.
	 */
	monitor.mapBeaconRSSI = function(rssi)
	{
		if (rssi >= 0) return 1; // Unknown RSSI maps to 1.
		if (rssi < -100) return 1; // Min RSSI
		return 100 + rssi;
	}

	monitor.getSortedBeaconList = function()
	{
		var beaconList = [];

		for (var key in beacons)
		{
			beaconList.push(beacons[key]);
		}

		beaconList.sort(
			function(beacon1, beacon2)
			{
				return monitor.mapBeaconRSSI(beacon1.rssi) <
					monitor.mapBeaconRSSI(beacon2.rssi);
			});

		return beaconList;
	}

	monitor.getBeaconList = function()
	{
		return beacons;
	}

	return monitor;
}

main();

})();
