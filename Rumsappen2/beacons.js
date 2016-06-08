;(function(){

// Beacon code.

// Application object.
var app = {}

// Regions that define which page to show for each beacon.

// Beacons sent to Usify.
app.beaconRegions =
[
	// Dark Blue
	{
		id: 'page-1',
		uuid:'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
		major: 32563,
		minor: 53202
	},
	// Green
	{
		id: 'page-2',
		uuid:'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
		major: 22968,
		minor: 32267
	},
	// Light Blue
	{
		id: 'page-3',
		uuid:'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
		major: 62024,
		minor: 14568
	}
]

// Micke's test beacons.
app.XbeaconRegions =
[
	{
		id: 'page-1',
		uuid:'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
		major: 23271,
		minor: 16990
	},
	{
		id: 'page-2',
		uuid:'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
		major: 43839,
		minor: 51056
	},
	{
		id: 'page-3',
		uuid:'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
		major: 46847,
		minor: 33121
	}
]

// Default page if out of range page.
app.infoPage = 'page-start'

// Currently displayed page.
app.currentPage = app.infoPage

// Distance to beacon in meters.
app.currentBeaconAccuracy = 1000

app.initialize = function()
{
	document.addEventListener(
		'deviceready',
		app.onDeviceReady,
		false)

	app.gotoInfoPage()
}

// Called when Cordova are plugins initialised,
// the iBeacon API is now available.
app.onDeviceReady = function()
{
	// Specify a shortcut for the location manager that
	// has the iBeacon functions.
	window.locationManager = cordova.plugins.locationManager

	// Start tracking beacons!
	app.startScanForBeacons()
}

app.startScanForBeacons = function()
{
	//console.log('startScanForBeacons')

	// The delegate object contains iBeacon callback functions.
	var delegate = new cordova.plugins.locationManager.Delegate()

	delegate.didDetermineStateForRegion = function(pluginResult)
	{
		//console.log('didDetermineStateForRegion: ' + JSON.stringify(pluginResult))
	}

	delegate.didStartMonitoringForRegion = function(pluginResult)
	{
		//console.log('didStartMonitoringForRegion:' + JSON.stringify(pluginResult))
	}

	delegate.didRangeBeaconsInRegion = function(pluginResult)
	{
		//console.log('didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult))
		app.didRangeBeaconsInRegion(pluginResult)
	}

	// Set the delegate object to use.
	locationManager.setDelegate(delegate)

	// Start monitoring and ranging our beacons.
	for (var r in app.beaconRegions)
	{
		var region = app.beaconRegions[r]

		var beaconRegion = new locationManager.BeaconRegion(
			region.id, region.uuid, region.major, region.minor)

		// Start monitoring.
		locationManager.startMonitoringForRegion(beaconRegion)
			.fail(console.error)
			.done()

		// Start ranging.
		locationManager.startRangingBeaconsInRegion(beaconRegion)
			.fail(console.error)
			.done()
	}
}

// Display pages depending of which beacon is close.
app.didRangeBeaconsInRegion = function(pluginResult)
{
	//console.log('numbeacons in region: ' + pluginResult.beacons.length)

	// There must be a beacon within range.
	if (0 == pluginResult.beacons.length)
	{
		return
	}

	// Our regions are defined so that there is one beacon per region.
	// Get the first (and only) beacon in range in the region.
	var beacon = pluginResult.beacons[0]

	// The region identifier is the page id.
	var pageId = pluginResult.region.identifier

	//console.log('@@@@@@@@@@@ ranged beacon: ' + pageId + ' ' + JSON.stringify(beacon))
	
	// Update accuracy for current beacon.
	if (pageId == app.currentPage)
	{
		app.currentBeaconAccuracy = beacon.accuracy
	}
	
	// Is this a new beacon that is near?
	if (pageId != app.currentPage &&
		(beacon.proximity == 'ProximityImmediate' || beacon.proximity == 'ProximityNear'))
	{
		// Is the new beacon closer that current one?
		if (beacon.accuracy > 0 && beacon.accuracy < app.currentBeaconAccuracy)
		{
			//console.log('@@@@@@@@@@@ new beacon closer! ' + pageId)
			// Show it.
			app.currentBeaconAccuracy = beacon.accuracy
		  app.gotoPage(pageId)
		  return
		}
	}
	
	// If this is the current page and beacon is far go to info page.
	if (app.currentPage == pageId)
	{
	    if (beacon.accuracy < 0 || 
	    	beacon.proximity == 'ProximityFar' || 
	    	beacon.proximity == 'ProximityUnknown')
	    {
		    app.gotoInfoPage()
	    }
	}
}

app.gotoInfoPage = function(pageId)
{
	app.currentBeaconAccuracy = 1000
	app.gotoPage(app.infoPage)
}

app.gotoPage = function(pageId)
{
  //console.log('*********** show beacon ' + pageId)
	app.currentPage = pageId
	$('.beacon-page').hide()
	$('#' + pageId).show()
}

/*
// Functions not used (from Relax Beacons App).

app.gotoPage = function(pageId)
{
	app.hidePage(app.currentPage)
	app.showPage(pageId)
	app.currentPage = pageId
}

app.showPage = function(pageId)
{
	document.getElementById(pageId).style.display = 'block'
}

app.hidePage = function(pageId)
{
	document.getElementById(pageId).style.display = 'none'
}
*/

// Set up the application.
app.initialize()

})();