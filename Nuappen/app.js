;(function(){

window.app = {}

var mEvents = []

// Timer for att kolla events

// Lista events
 
app.getEvents = function()
{
	return mEvents
}

app.startMonitorEvents = function()
{
	setInterval(function() {}, 60000)
}


var addEvent = function(event)
{
	mEvents.push(event)
}



var checkEvent = function(event)
{
	// If event triggers, show alarm
}

// Location


// Time


// Event



// Rule



// Events

addEvent(
	{
	name: 'Vakna', 
	time: '9:00', 
	place: 'Hemma'
	})
	
	
// Build NU list.

function buildTodayList()
{
  var html = ''
  html += addTodayListItem('Frukost', 'icon-eat.png')
  html += addTodayListItem('Ta med gympapåsen', 'icon-reminder.png')
  html += addTodayListItem('Ta med matlåda', 'icon-reminder.png')
  html += addTodayListItem('Lunch', 'icon-eat.png')
  addTodayList(html)
}

function addTodayListItem(text, icon)
{
  var html = 
    '<li class="mdl-list__item">' +
      '<img class="evo-list-icon-1" src="icons/' + icon + '" />' +
      '<img class="evo-list-icon-2" src="icons/icon-start.png" />' +
      '<img class="evo-list-icon-3" src="icons/icon-arrow-down.png" />' +
      '<span class="mdl-list__item-primary-content">' +
        text +
      '</span>' +
    '</li>'
  return html
}

function addTodayList(html)
{
  $('.evo-list-today').append(html)
  componentHandler.upgradeElement($('.evo-list-today').get(0))
}

function getDateString()
{
    var date = new Date()
    var month = monthString(date.getMonth())
    var day = date.getDate()
    var weekday = weekdayString(date.getDay())
    var hour = padNumber(date.getHours())
    var minute = padNumber(date.getMinutes())
    return weekday + ' ' + day + ' ' + month + ' ' + hour + ':' + minute
}

function padNumber(n)
{
  if (n < 10)
  {
    return '0' + n
  }
  else
  {
    return '' + n
  }
}

function weekdayString(day)
{
  var days = [
    'Måndag',
    'Tisdag',
    'Onsdag',
    'Torsdag',
    'Fredag',
    'Lördag',
    'Söndag']
  return days[day]
}

function monthString(month)
{
  var months = [
    'januari',
    'februari',
    'mars',
    'april',
    'maj',
    'juni',
    'juli',
    'augusti',
    'september',
    'oktober',
    'november',
    'december']
  return months[month]
}

buildTodayList()

setInterval(
  function() {
    $('.evo-header-date').html(getDateString())
  }, 
  30000)
$('.evo-header-date').html(getDateString())

})();