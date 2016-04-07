#!/usr/bin/env node

module.exports = function(context)
{
	console.log('@@@ after_prepare_android')

	var UTIL = require('./util.js')

	// Insert version info into target index.html.
	UTIL.insertVersionInfo(context, './platforms/android/assets/www/index.html')

	// Insert version info into target app.js.
	UTIL.insertVersionInfo(context, './platforms/android/assets/www/js/app.js')

	// Copy files.
	UTIL.copyFileUTF8(
		'./config/native/android/src/com/evothings/acmelauncher/MainActivity.java',
		'./platforms/android/src/com/evothings/acmelauncher/MainActivity.java')
}
