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
  
  var options = {}
  
  options.label = 'Frukost'
  options.icon = 'icon-eat.png'
  options.expandedHTML = 
    '<p>Består av:</p>' +
    '<ul><li>Göra iordning/ta fram frukost</li><li>Duka</li><li>Äta</li>' +
    '<li>Duka av och ställa i diskmaskinen</li></ul>'
  options.timeLabel = '7.00-7.30 vardagar'
  options.status = 'PÅGÅENDE AKTIVITET'
  createTodayListItem(options)
  
  options.label = 'Ta med matlåda'
  options.icon = 'icon-reminder.png'
  options.expandedHTML = 
    '<p>Består av:</p>' +
    '<ul><li>Plocka fram matlådan</li><li>Ta platspåse runt</li>' +
    '<li>Lägg i väskan</li></ul>'
  options.timeLabel = '8.00 vardagar'
  options.status = 'KOMMANDE AKTIVITET'
  createTodayListItem(options)
  
  options.label = 'Ta med gympapåsen'
  options.icon = 'icon-reminder.png'
  options.expandedHTML = 
    '<p>Består av:</p>' +
    '<ul><li>Packa skor, byxor, tröja, handduk</li>' +
    '<li>Lägg i väskan</li></ul>'
  options.timeLabel = '8.00 onsdag och fredag'
  options.status = 'KOMMANDE AKTIVITET'
  createTodayListItem(options)
  
  options.label = 'Lunch'
  options.icon = 'icon-eat.png'
  options.expandedHTML = 
    '<p>Består av:</p>' +
    '<ul><li>Gå till lunchrummet</li>' +
    '<li>Värm matlåta</li>' +
    '<li>Äta och dricka</li>' +
    '<li>Diska matlåta</li></ul>'
  options.timeLabel = '12.00-12.30 vardagar'
  options.status = 'KOMMANDE AKTIVITET'
  createTodayListItem(options)
  
  //$('.evo-today-list').children().get(0).css('border-top', '1px solid #cccccc')
  
  componentHandler.upgradeElement($('.evo-today-list').get(0))
}

var Counter = 1
          
function createTodayListItem(options)
{
  var expanded = false
  
  var id = 'id-' + (Counter++)
  
  var item = $(
    '<li class="mdl-list__item evo-today-list-item" id="' +  id + '">' +
      '<img class="evo-list-icon-1" src="icons/' + options.icon + '" />' +
      '<img class="evo-list-icon-2" src="icons/icon-start.png" />' +
      '<img class="evo-list-icon-expand" src="icons/icon-arrow-down.png" />' +
      '<span class="mdl-list__item-primary-content evo-today-list-item-content">' +
        options.label +
      '</span>' +
    '</li>')
    
  var item2 = $(
    '<li class="evo-today-list-item-expanded" id="' +  id + '-expanded">' +
      '<img class="evo-list-icon-ongoing" src="icons/icon-ongoing.png" />' +
      '<div class="evo-today-list-item-content-expanded">' +
        '<h3>' + options.timeLabel +'</h3>' +
        '<p>' + options.status +'</p>' +
        options.expandedHTML +
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
      item.css('border-bottom', '0px solid')
    }
    else
    {
      item2.hide();
      toggleButton.attr('src', 'icons/icon-arrow-down.png')
      item.css('border-bottom', '1px solid #cccccc')
    }
  }
  
  item.css('border-bottom', '1px solid #cccccc')
  
  item.find('.evo-list-icon-expand').on('click', toogleDetail)
  
  addSwipe(item.get(0), createShowItemMenuFun(item, id))
  
  $('.evo-today-list').append(item)
  $('.evo-today-list').append(item2)
}

function addSwipe(myElement, swipeFun)
{
  var options = { direction: Hammer.DIRECTION_VERTICAL }
  var hammertime = new Hammer(myElement, options)
  hammertime.on('swipeleft', swipeFun)
}

var TodayListCurrentItem = null

function createShowItemMenuFun(item, id)
{
  return function(event)
  {
    TodayListCurrentItem = item
	  var top = item.offset().top
	  $('.evo-today-list-item-menu-button-tabort').css('top', top + 'px')
    $('.evo-today-list-item-menu-button-klar').css('top', top + 'px')
	  $('.evo-today-list-item-menu').show()
  }
}

function onButtonTaBort()
{
  var expandedItemID = '#' + TodayListCurrentItem.attr('id') + '-expanded'
  $(expandedItemID).remove()
  TodayListCurrentItem.remove()
  TodayListCurrentItem = null
}

function onButtonKlar()
{
  onButtonTaBort()
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
  return days[day - 1]
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

function initEvents()
{
  $('.evo-today-list-item-menu-button-tabort').on('click', onButtonTaBort)
  $('.evo-today-list-item-menu-button-klar').on('click', onButtonKlar)
	$('.evo-today-list-item-menu').on('click', function()
	{
	  $('.evo-today-list-item-menu').hide()
	})
}

function startDateTimer()
{
  setInterval(
    function() {
      $('.evo-header-date').html(getDateString())
    }, 
    30000)
  $('.evo-header-date').html(getDateString())
}

function main()
{
  buildTodayList()
  initEvents()
  startDateTimer()
}

main()

})();