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
  $('.evo-today-list').empty()
  createTodayListItem('Frukost', 'icon-eat.png')
  createTodayListItem('Ta med gympapåsen', 'icon-reminder.png')
  createTodayListItem('Ta med matlåda', 'icon-reminder.png')
  createTodayListItem('Lunch', 'icon-eat.png', true)
  
  componentHandler.upgradeElement($('.evo-today-list').get(0))
}

var Counter = 1

function createTodayListItem(text, icon, last, expandedHTML)
{
  var expanded = false
  
  var id = 'id-' + (Counter++)
  
  var item = $(
    '<li class="mdl-list__item evo-today-list-item" id="' +  id + '">' +
      '<img class="evo-list-icon-1" src="icons/' + icon + '" />' +
      '<img class="evo-list-icon-2" src="icons/icon-start.png" />' +
      '<img class="evo-list-icon-expand" src="icons/icon-arrow-down.png" />' +
      '<span class="mdl-list__item-primary-content evo-today-list-item-content">' +
        text +
      '</span>' +
    '</li>')
    
  var item2 = $(
    '<li class="evo-today-list-item-expanded" id="' +  id + '-expanded">' +
      '<img class="evo-list-icon-ongoing" src="icons/icon-ongoing.png" />' +
      '<div class="evo-today-list-item-content-expanded">' +
          '<h3>7.00-7.30 vardagar</h3><p>PÅGÅENDE AKTIVITET</p><p>Består av:</p>' +
          '<ul><li>Göra iordning/ta fram frukost</li><li>Duka</li><li>Äta</li>' +
          '<li>Duka av och ställa i diskmaskinen</li></ul>' +
      '</div>' +
    '</li>')
    
  var toggleButton = item.find('.evo-list-icon-expand')
  
  function toogleDetail()
  {
    expanded = !expanded
    if (expanded) 
    {
      item2.show();
      toggleButton.attr('src', 'icons/icon-arrow-up.png')
      if (last) item.css('border-bottom', '0px solid')
    }
    else
    {
      item2.hide();
      toggleButton.attr('src', 'icons/icon-arrow-down.png')
      if (last) item.css('border-bottom', '1px solid #cccccc')
    }
  }
  
  
  item.css('border-top', '1px solid #cccccc')
  if (last) item.css('border-bottom', '1px solid #cccccc')
  if (last) item2.css('border-bottom', '1px solid #cccccc')
  
  item.find('.evo-list-icon-expand').on('click', toogleDetail)
  
  $('.evo-today-list').append(item)
  $('.evo-today-list').append(item2)
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