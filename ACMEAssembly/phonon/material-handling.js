;(function()
{

// Beacon --> dataItem

var dataItems = [];

function makeDataItem(title)
{
	dataItems.push(
	{
		title: title,
		id: 'ACM-' + (Math.trunc(Math.random() * 1000000))
	})
}

makeDataItem('Engine Parts')
makeDataItem('Main Wing Parts')
makeDataItem('Tail Section Parts')
makeDataItem('Fuselage Parts')
makeDataItem('Landing Gear Parts')

// Beacon monitor.
var monitor = null;

// Timer that displays list of beacons.
var displayTimer = null;

// Timer that updates beacons.
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
	setTimeout(
		function()
		{
			monitor.startScan();
			// Initial display.
			updateBeacons();
			displayBeacons();
		},
		100);

	// Display refresh timer.
	displayTimer = setInterval(displayBeacons, 500);

	// Update timer.
	updateTimer = setInterval(updateBeacons, 1000);
}

function updateBeacons()
{
	var beacons = monitor.getSortedBeaconList(function(beacon1, beacon2)
	{
		return false;
	});

	beacons.forEach(function(beacon)
	{
		// For demo.
		beacon.timeStamp = Date.now();

		// Associate beacon with data (this for demo purpose, in a real
		// app use a database with beacon id mapped to data).
		if (!beacon.data)
		{
			beacon.data = dataItems.pop();
			if (!beacon.data)
			{
				beacon.data = makeDataItem(
					'PART-' + (Math.trunc(Math.random() * 1000000)));
			}
		}

		if (!beacon.distance)
		{
			beacon.distance = Math.trunc(Math.random() * 300 + 20);
		}

		beacon.distance += Math.trunc(Math.random() * 10 - 5);
	});

	// Remove inactive beacons.
	monitor.removeInactiveBeacons();
}

// Display the list of beacons.
function displayBeacons()
{
	// Sort beacons.
	var beacons = monitor.getSortedBeaconList(function(beacon1, beacon2)
	{
		if (beacon1.distance && beacon2.distance)
		{
			return beacon1.distance > beacon2.distance;
		}

		return false;
	});

	// Clear beacon list.
	$('.beacon-list').empty();

	// Display beacon list.
	beacons.forEach(function(beacon)
	{
		if (!beacon.data) return;

		//var dist = (1000 - beacon.distance) / 15;
		var dist = (beacon.distance) / 15;

		// Create HTML to display beacon data.
		var element = $(
			'<li>'
			+	'<p class="title"><b>' + beacon.data.title + '</b><br />'
			+ 		'ID: ' + beacon.data.id + '<br />'
			+	'Distance: ' + (beacon.distance/10) + ' m</p>'
			+   '<div class="evo-dist-bar" style="width:' + dist + '%;"></div>'
			+ '</li>'
		);

		$('.beacon-list').append(element);
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

	for (var i = 0; i < 5; ++i) { monitor.createFake(); }

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
/*
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
*/
	monitor.getSortedBeaconList = function(sortFun)
	{
		var beaconList = [];

		for (var key in beacons)
		{
			beaconList.push(beacons[key]);
		}

		beaconList.sort(sortFun);

		return beaconList;
	}

	monitor.getBeaconList = function()
	{
		return beacons;
	}

	monitor.removeInactiveBeacons = function()
	{
		var timeNow = Date.now();
		for (var key in beacons)
		{
			var beacon = beacons[key];
			if (beacon.timeStamp + 5000 < timeNow)
			{
				delete beacons[key];
			}
		}
	}

	return monitor;
}

main();

})();
