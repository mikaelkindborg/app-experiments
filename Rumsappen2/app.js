;(function(){

window.app = {}

// Build lists for rooms.

function buildLists()
{
  var options = {}
  
  // Page 1: Hall
  
  options.listSelector = '#page-1 .mdl-list'
  $(options.listSelector).empty()
  
  options.label = 'Plocka iordning skor'
  options.icon = 'icon-clean.png'
  options.expandedHTML = 
    '<ul><li>Ställa in skor i skostället</li><li>Plocka undan skor som inte används</li><li>Kontrollera vilka skor som behöver göras rent</li><li>Kontrollera om det är skor som behöver skötas om tex. smörjas in</li></ul>'
  createListItem(options)
  
  options.label = 'Dammsuga'
  options.icon = 'icon-clean.png'
  options.expandedHTML = 
    '<ul><li>Kontrollera att dammsugarpåsen inte är full</li><li>Om den är full byta ut den mot en ny påse</li><li>Se till att saker är upplockade som ligger på golvet</li></ul>'
  createListItem(options)
  
  options.label = 'Städa bland kläder'
  options.icon = 'icon-clean.png'
  options.expandedHTML = 
    '<ul><li>Ta undan kläder som blivit för små</li><li>Ta undan kläder som inte hör till säsongen</li><li>Kontrollera om något behöver tvättas</li></ul>'
  createListItem(options)
  
  options.label = 'Ställa gympapåse'
  options.icon = 'icon-reminder.png'
  options.expandedHTML = 
    '<ul><li>Plocka iordning gympapåsen med kläder</li><li>Ställa den i hallen dagen innan det är dags för gympa</li></ul>'
  createListItem(options)

  componentHandler.upgradeElement($(options.listSelector).get(0))
  
  // Page 2: Kok
  
  options.listSelector = '#page-2 .mdl-list'
  $(options.listSelector).empty()
  
  options.label = 'Plocka ur diskmaskinen'
  options.icon = 'icon-clean.png'
  options.expandedHTML = 
    '<ul><li>Ställa tillbaka den rena disken där den ska stå</li><li>Kontrollera om något inte blev rent och behöver diskas om</li></ul>'
  createListItem(options)
  
  options.label = 'Laga middag'
  options.icon = 'icon-eat.png'
  options.expandedHTML = 
    '<ul><li>Ta fram eventuellt recept</li><li>Se till att alla ingredienser finns hemma</li><li>Ta fram ingredienser</li><li>Laga maten</li><li>Passa koktider/ugnstider</li><li>Duka</li><li>Samla familjen</li><li>Servera</li></ul>'
  createListItem(options)
  
  options.label = 'Skriva inköpslista'
  options.icon = 'icon-reminder.png'
  options.expandedHTML = 
    '<ul><li>Kolla vad som är slut i kylskåpet</li><li>Vad behövs till matlagning kommande dagar</li><li>Eventuellt planera veckans mat</li></ul>'
  createListItem(options)
  
  options.label = 'Göra iordning matlåda'
  options.icon = 'icon-eat.png'
  options.expandedHTML = 
    '<ul><li>Kolla om det finns rester att ha till matlåda</li><li>Laga mat till matlåda</li><li>Ställa iordning i kylen inför nästa dag</li></ul>'
  createListItem(options)
  
  componentHandler.upgradeElement($(options.listSelector).get(0))
  
  // Page 3: Vardagsrum
  
  options.listSelector = '#page-3 .mdl-list'
  $(options.listSelector).empty()

  options.label = 'Städa'
  options.icon = 'icon-clean.png'
  options.expandedHTML = 
    '<ul><li>Plocka undan saker</li><li>Torka damm</li><li>Dammsuga golven</li><li>Våttorka golven</li></ul>'
  createListItem(options)
  
  options.label = 'Rita'
  options.icon = 'icon-face.png'
  options.expandedHTML = 
    '<ul><li>Ta fram pennor och papper</li><li>Eventuellt rita tillsammans med barnen</li></ul>'
  createListItem(options)
  
  options.label = 'Vattna blommor'
  options.icon = 'icon-flower.png'
  options.expandedHTML = 
    '<ul><li>Eventuellt växtnäring i vattnet</li><li>Vattna regelbundet</li><li>Vattna lagom mycket</li></ul>'
  createListItem(options)
  
  options.label = 'Spela spel'
  options.icon = 'icon-family.png'
  options.expandedHTML = 
    '<ul><li>Jippie!</li></ul>'
  createListItem(options)
  
  options.label = 'Titta på tv'
  options.icon = 'icon-movie.png'
  options.expandedHTML = 
    '<ul><li>Filmtajm!</li></ul>'
  createListItem(options)
  
  options.label = 'Dammsuga sofforna'
  options.icon = 'icon-clean.png'
  options.expandedHTML = 
    '<ul><li>Kontroller om överdragen behöver tvättas</li><li>Speciellt munstycke till dammsugaren behövs</li></ul>'
  createListItem(options)
  
  componentHandler.upgradeElement($(options.listSelector).get(0))
  
  //$('.evo-today-list').children().get(0).css('border-top', '1px solid #cccccc')
}

var Counter = 1
          
function createListItem(options)
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

function main()
{
  buildLists()
  startDateTimer()
  // For testing.
  //$('.beacon-page').hide()
  //$('#page-start').show()
}

main()

})();