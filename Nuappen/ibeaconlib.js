;(function(){

// Beacon code.

// Module object.
window.evothings = window.evothings || {}
evothings.ibeacon = {}

// iBeacon location manager object.
var locationManager = null

var beaconRegions = null

// Currently ranged beacon.
var currentBeaconId = null

// Distance in meters to currently ranged beacon.
var currentBeaconAccuracy = 1000

// Default is 1 meter.
var beaconRangedAccuracy = 1

// Default is 1 meter.
var beaconOutOfRangeAccuracy = 1

var beaconRangedFun = null

var beaconOutOfRangeFun = null

var startScanningRequested = false

var deviceReady = false

function initialize()
{
	document.addEventListener(
		'deviceready',
		onDeviceReady,
		false)
}

// Called when Cordova are plugins initialised,
// the iBeacon API is now available.
function onDeviceReady()
{
	deviceReady = true
	
	// Specify a shortcut for the location manager that
	// has the iBeacon functions.
	locationManager = cordova.plugins.locationManager
	
	if (startScanningRequested)
	{
		startScanningRequested = false
		evothings.ibeacon.startScanningForBeacons()
	}
}

evothings.ibeacon.initialize = function()
{
	document.addEventListener(
		'deviceready',
		onDeviceReady,
		false)
}

evothings.ibeacon.setBeaconRegions = function(regions)
{
	beaconRegions = regions
}

// Set distance to beacon in meters for beacon event to trigger.
evothings.ibeacon.setBeaconRangedAccuracy = function(accuracy)
{
	beaconRangedAccuracy = accuracy
}

// Set distance to beacon in meters for beacon to go out of range.
evothings.ibeacon.setBeaconOutOfRangeAccuracy = function(accuracy)
{
	beaconOutOfRangeAccuracy = accuracy
}

// Set function called when a beacon comes in range.
evothings.ibeacon.setBeaconRangedFun = function(callback)
{
	beaconRangedFun = callback
}

evothings.ibeacon.setBeaconOutOfRangeFun = function(callback)
{
	beaconOutOfRangeFun = callback
}

evothings.ibeacon.startScanningForBeacons = function()
{
	if (!deviceReady) 
	{
		startScanningRequested = true
		return
	}
	
	//console.log('startScanForBeacons')

	// The delegate object contains iBeacon callback functions.
	var delegate = new locationManager.Delegate()

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
		didRangeBeaconsInRegion(pluginResult)
	}

	// Set the delegate object to use.
	locationManager.setDelegate(delegate)

	// Start monitoring and ranging our beacons.
	for (var r in beaconRegions)
	{
		var region = beaconRegions[r]

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
function didRangeBeaconsInRegion(result)
{
	//console.log('numbeacons in region: ' + result.beacons.length)

	// There must be a beacon in the result set.
	if (0 == result.beacons.length)
	{
		return
	}

	// Our regions are defined so that there is one beacon per region.
	// Get the first (and only) beacon in range in the region.
	var beacon = result.beacons[0]

	// The region identifier is the page id.
	var beaconId = result.region.identifier

	//console.log('@@@ ranged beacon: ' + beaconId + ' ' + JSON.stringify(beacon))
	//console.log('@@@ ranged beacon: ' + beaconId + ' ' + beacon.accuracy)
	
	// Update accuracy for current beacon.
	if (beaconId == currentBeaconId)
	{
		// Update accuracy.
		currentBeaconAccuracy = beacon.accuracy
	  
	  // Is the beacon out of range?
	  if (currentBeaconAccuracy < 0 || 
	    	currentBeaconAccuracy > beaconOutOfRangeAccuracy)
	  {
			//console.log('@@@ beacon out of range! ' + beaconId)
	  	currentBeaconAccuracy = 1000
	  	currentBeaconId = null
		  beaconOutOfRangeFun && beaconOutOfRangeFun(beaconId, beacon.accuracy)
	  }
	}
	// Is this a new beacon?
	else if (beaconId != currentBeaconId)
	{
		// Is the new beacon closer that current one?
		if (beacon.accuracy > 0 && 
			beacon.accuracy < beaconRangedAccuracy && 
			beacon.accuracy < currentBeaconAccuracy)
		{
			//console.log('@@@ new beacon close! ' + beaconId)
			// Make this the current beacon.
			currentBeaconAccuracy = beacon.accuracy
		  currentBeaconId = beaconId
		  beaconRangedFun && beaconRangedFun(beaconId, beacon.accuracy)
		}
	}
}

})();