;(function(){

window.app = {}

// Beacon functions.

var beaconRegions =
[
	// Beacons sent to Usify.
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
	},
	
	// Micke's test beacons.
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
//app.infoPage = 'page-start'

/*
function gotoBeaconInfoPage(pageId)
{
	app.currentBeaconAccuracy = 1000
	app.gotoBeaconPage(beaconInfoPage)
}

function gotoBeaconPage(pageId)
{
  //console.log('*********** show beacon ' + pageId)
	app.currentPage = pageId
	$('.beacon-page').hide()
	$('#' + pageId).show()
}
*/

function initializeBeacons()
{
	evothings.ibeacon.initialize()
	evothings.ibeacon.setBeaconRegions(beaconRegions)
	evothings.ibeacon.startScanningForBeacons()
}

// Build beacon list for rooms.

function buildRoomLists()
{
  var options = {}
  
  // Page 1: Hall
  
  options.listSelector = '#page-1 .mdl-list'
  $(options.listSelector).empty()
  
  options.label = 'Plocka iordning skor'
  options.icon = 'icon-clean.png'
  options.expandedHTML = 
    '<ul><li>Ställa in skor i skostället</li><li>Plocka undan skor som inte används</li><li>Kontrollera vilka skor som behöver göras rent</li><li>Kontrollera om det är skor som behöver skötas om tex. smörjas in</li></ul>'
  createRoomListItem(options)
  
  options.label = 'Dammsuga'
  options.icon = 'icon-clean.png'
  options.expandedHTML = 
    '<ul><li>Kontrollera att dammsugarpåsen inte är full</li><li>Om den är full byta ut den mot en ny påse</li><li>Se till att saker är upplockade som ligger på golvet</li></ul>'
  createRoomListItem(options)
  
  options.label = 'Städa bland kläder'
  options.icon = 'icon-clean.png'
  options.expandedHTML = 
    '<ul><li>Ta undan kläder som blivit för små</li><li>Ta undan kläder som inte hör till säsongen</li><li>Kontrollera om något behöver tvättas</li></ul>'
  createRoomListItem(options)
  
  options.label = 'Ställa gympapåse'
  options.icon = 'icon-reminder.png'
  options.expandedHTML = 
    '<ul><li>Plocka iordning gympapåsen med kläder</li><li>Ställa den i hallen dagen innan det är dags för gympa</li></ul>'
  createRoomListItem(options)

  componentHandler.upgradeElement($(options.listSelector).get(0))
  
  // Page 2: Kok
  
  options.listSelector = '#page-2 .mdl-list'
  $(options.listSelector).empty()
  
  options.label = 'Plocka ur diskmaskinen'
  options.icon = 'icon-clean.png'
  options.expandedHTML = 
    '<ul><li>Ställa tillbaka den rena disken där den ska stå</li><li>Kontrollera om något inte blev rent och behöver diskas om</li></ul>'
  createRoomListItem(options)
  
  options.label = 'Laga middag'
  options.icon = 'icon-eat.png'
  options.expandedHTML = 
    '<ul><li>Ta fram eventuellt recept</li><li>Se till att alla ingredienser finns hemma</li><li>Ta fram ingredienser</li><li>Laga maten</li><li>Passa koktider/ugnstider</li><li>Duka</li><li>Samla familjen</li><li>Servera</li></ul>'
  createRoomListItem(options)
  
  options.label = 'Skriva inköpslista'
  options.icon = 'icon-reminder.png'
  options.expandedHTML = 
    '<ul><li>Kolla vad som är slut i kylskåpet</li><li>Vad behövs till matlagning kommande dagar</li><li>Eventuellt planera veckans mat</li></ul>'
  createRoomListItem(options)
  
  options.label = 'Göra iordning matlåda'
  options.icon = 'icon-eat.png'
  options.expandedHTML = 
    '<ul><li>Kolla om det finns rester att ha till matlåda</li><li>Laga mat till matlåda</li><li>Ställa iordning i kylen inför nästa dag</li></ul>'
  createRoomListItem(options)
  
  componentHandler.upgradeElement($(options.listSelector).get(0))
  
  // Page 3: Vardagsrum
  
  options.listSelector = '#page-3 .mdl-list'
  $(options.listSelector).empty()

  options.label = 'Städa'
  options.icon = 'icon-clean.png'
  options.expandedHTML = 
    '<ul><li>Plocka undan saker</li><li>Torka damm</li><li>Dammsuga golven</li><li>Våttorka golven</li></ul>'
  createRoomListItem(options)
  
  options.label = 'Rita'
  options.icon = 'icon-face.png'
  options.expandedHTML = 
    '<ul><li>Ta fram pennor och papper</li><li>Eventuellt rita tillsammans med barnen</li></ul>'
  createRoomListItem(options)
  
  options.label = 'Vattna blommor'
  options.icon = 'icon-flower.png'
  options.expandedHTML = 
    '<ul><li>Eventuellt växtnäring i vattnet</li><li>Vattna regelbundet</li><li>Vattna lagom mycket</li></ul>'
  createRoomListItem(options)
  
  options.label = 'Spela spel'
  options.icon = 'icon-family.png'
  options.expandedHTML = 
    '<ul><li>Jippie!</li></ul>'
  createRoomListItem(options)
  
  options.label = 'Titta på tv'
  options.icon = 'icon-movie.png'
  options.expandedHTML = 
    '<ul><li>Filmtajm!</li></ul>'
  createRoomListItem(options)
  
  options.label = 'Dammsuga sofforna'
  options.icon = 'icon-clean.png'
  options.expandedHTML = 
    '<ul><li>Kontroller om överdragen behöver tvättas</li><li>Speciellt munstycke till dammsugaren behövs</li></ul>'
  createRoomListItem(options)
  
  componentHandler.upgradeElement($(options.listSelector).get(0))
  
  //$('.evo-today-list').children().get(0).css('border-top', '1px solid #cccccc')
}

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

// Global variables

var Counter = 1

var SelectedTodayItem = null
       
var ITEMSTATE_NOTDONE = 1
var ITEMSTATE_ONGOING = 2
var ITEMSTATE_DONE = 3
var ITEMSTATE_DELETED = 4

var ITEMTEXTSTATE_NOTDONE = 'KOMMANDE AKTIVITET'
var ITEMTEXTSTATE_ONGOING = 'PÅGÅENDE AKTIVITET'
var ITEMTEXTSTATE_DONE = 'FÄRDIG AKTIVITET'

function createTodayListItem(options)
{
	// State variables.
	
  var expanded = false
  
  var itemState = ITEMSTATE_NOTDONE
  
  var id = 'id-' + (Counter++)
  
  // List item.
  
  var item = $(
    '<li class="mdl-list__item evo-today-list-item" id="' +  id + '">' +
      '<img class="evo-list-icon-1" src="icons/' + options.icon + '" />' +
      '<img class="evo-list-icon-2" src="icons/icon-start.png" />' +
      '<img class="evo-list-icon-expand" src="icons/icon-arrow-down.png" />' +
      '<span class="mdl-list__item-primary-content evo-today-list-item-content">' +
        options.label +
      '</span>' +
    '</li>')
    
  // Expanded list item.
  
  var item2 = $(
    '<li class="evo-today-list-item-expanded" id="' +  id + '-expanded">' +
      '<img class="evo-list-icon-ongoing" src="icons/icon-ongoing.png" />' +
      '<div class="evo-today-list-item-content-expanded">' +
        '<h3>' + options.timeLabel +'</h3>' +
        '<p class="evo-today-list-item-text-state">' + ITEMTEXTSTATE_NOTDONE +'</p>' +
        options.expandedHTML +
      '</div>' +
    '</li>')
    
  // Save reference to item text state.
  var itemTextState = item2.find('.evo-today-list-item-text-state')
  
  // Toggle show/hide expanded item.
  
  var toggleButton = item.find('.evo-list-icon-expand')
  
  function toogleDetail()
  {
    expanded = !expanded
    if (expanded) 
    {
      toggleButton.attr('src', 'icons/icon-arrow-up.png')
      // http://www.greywyvern.com/code/php/binary2base64/
      toggleButton.css('width', '60px')
      item.css('background-color', 'green')
      item2.show();
      item.css('border-bottom', '0px solid')
    }
    else
    {
      toggleButton.attr('src', 'icons/icon-arrow-down.png')
      toggleButton.css('width', '40px')
      item.css('background-color', 'white')
      item2.hide();
      item.css('border-bottom', '1px solid #cccccc')
    }
  }
  
  toggleButton.on('dragstart', function() { return false })
  addTap(toggleButton.get(0), toogleDetail)
  
  // Toggle item state.
  
  var stateButton = item.find('.evo-list-icon-2')
  
  function toogleState()
  {
    if (itemState == ITEMSTATE_NOTDONE) 
    {
    	itemState = ITEMSTATE_ONGOING
    	itemTextState.text(ITEMTEXTSTATE_ONGOING)
      stateButton.attr('src', 'icons/icon-paus.png')
    }
    else if (itemState == ITEMSTATE_ONGOING) 
    {
    	itemState = ITEMSTATE_NOTDONE
    	itemTextState.text(ITEMTEXTSTATE_NOTDONE)
      stateButton.attr('src', 'icons/icon-start.png')
    }
  }
  
  stateButton.on('dragstart', function() { return false })
  addTap(stateButton.get(0), toogleState)
  
  // Item swipe.
  
  addSwipe(item.get(0), showItemMenu)
  
	function showItemMenu()
	{
		// Currently selected item.
		SelectedTodayItem = {
			done: itemDone,
			remove: itemRemove
		}
		
		// Show menu.
		var top = item.offset().top
		$('.evo-today-list-item-menu-button-tabort').css('top', top + 'px')
		$('.evo-today-list-item-menu-button-klar').css('top', top + 'px')
		$('.evo-today-list-item-menu').show()
	}
	
	function itemDone()
	{
		itemState = ITEMSTATE_DONE
		itemTextState.text(ITEMTEXTSTATE_DONE)
		stateButton.attr('src', 'icons/icon-klar-round.png')
	}

	function itemRemove()
	{
			itemState = ITEMSTATE_DELETED
			item.remove()
			item2.remove()
	}

  // Set initial item CSS.
  
  item.css('border-bottom', '1px solid #cccccc')
  item2.css('border-bottom', '1px solid #cccccc')
  
  // Add items.
  
  $('.evo-today-list').append(item)
  $('.evo-today-list').append(item2)
}

function addSwipe(myElement, swipeFun)
{
  var options = { direction: Hammer.DIRECTION_VERTICAL }
  var hammertime = new Hammer(myElement, options)
  hammertime.on('swipeleft', swipeFun)
}

function addTap(myElement, tapFun)
{
  var options = {  }
  var hammertime = new Hammer(myElement, options)
  hammertime.on('tap', tapFun)
}

function onButtonTaBort()
{
	SelectedTodayItem.remove()
	SelectedTodayItem = null
}

function onButtonKlar()
{
	SelectedTodayItem.done()
	SelectedTodayItem = null
}

function createRoomListItem(options)
{
  var expanded = false
  
  var id = 'id-' + (Counter++)
  
  var item = $(
    '<li class="mdl-list__item evo-list-item" id="' +  id + '">' +
      '<img class="evo-list-icon-1" src="icons/' + options.icon + '" />' +
      '<img class="evo-list-icon-expand" src="icons/icon-arrow-down.png" />' +
      '<span class="mdl-list__item-primary-content evo-list-item-content">' +
        options.label +
      '</span>' +
    '</li>')
    
  var item2 = $(
    '<li class="evo-list-item-expanded" id="' +  id + '-expanded">' +
      '<div class="evo-list-item-content-expanded">' +
        options.expandedHTML +
      '</div>' +
    '</li>')
    
  var toggleButton = item.find('.evo-list-icon-expand')
  
  function toogleDetail()
  {
    expanded = !expanded
    if (expanded) 
    {
      toggleButton.attr('src', 'icons/icon-arrow-up.png')
      item2.show();
      item.css('border-bottom', '0px solid')
      item2.css('border-bottom', '1px solid #cccccc')
    }
    else
    {
      toggleButton.attr('src', 'icons/icon-arrow-down.png')
      item2.hide();
      item.css('border-bottom', '1px solid #cccccc')
    }
  }
  
  item.css('border-bottom', '1px solid #cccccc')
  
  item.find('.evo-list-icon-expand').on('click', toogleDetail)
  
  $(options.listSelector).append(item)
  $(options.listSelector).append(item2)
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

function startDateTimer()
{
  setInterval(
    function() {
      $('.evo-header-date').html(getDateString())
    }, 
    30000)
  $('.evo-header-date').html(getDateString())
}

// TODO: Write.
/*function initialize()
{
	app.gotoInfoPage()
}*/

function main()
{
  buildTodayList()
  buildRoomLists()
  initEvents()
  startDateTimer()
	//initializeBeacons()
}



main()

})();