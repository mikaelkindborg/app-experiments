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

function addTodayListItem(text, icon, expandedHTML)
{
  // TODO: Add ids to items. And click/drag events.
  var html = 
    '<li class="mdl-list__item evo-today-list-item">' +
      '<img class="evo-list-icon-1" src="icons/' + icon + '" />' +
      '<img class="evo-list-icon-2" src="icons/icon-start.png" />' +
      '<img class="evo-list-icon-expand" src="icons/icon-arrow-down.png" />' +
      '<span class="mdl-list__item-primary-content evo-today-list-item-content">' +
        text +
      '</span>' +
    '</li>' +
    '<li class="evo-today-list-item-expanded">' +
      '<img class="evo-list-icon-ongoing" src="icons/icon-ongoing.png" />' +
      '<div class="evo-today-list-item-content-expanded">' +
          '<h3>7.00-7.30 vardagar</h3><p>PÅGÅENDE AKTIVITET</p><p>Består av:</p>' +
          '<ul><li>Göra iordning/ta fram frukost</li><li>Duka</li><li>Äta</li>' +
          '<li>Duka av och ställa i diskmaskinen</li></ul>' +
      '</div>' +
    '</li>'
  return html
}

function addTodayList(html)
{
  $('.evo-today-list').append(html)
  componentHandler.upgradeElement($('.evo-today-list').get(0))
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