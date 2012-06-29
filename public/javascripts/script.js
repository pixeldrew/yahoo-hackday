var sUri = "http://d.yimg.com/autoc.finance.yahoo.com/autoc";

YUI().use('autocomplete', 'autocomplete-highlighters', function (Y) {

  var stockTemplate =
  '<div class="details">' +
  '<strong class="symbol">{symbol}</strong>' +
  '<span class="company">{name}</span>' +
  '<span class="exchange">{exchange}</span>' +
  '</div>';

  function stockFormatter(query, results) {

    return Y.Array.map(results, function (result) {
      var stock = result.raw;

      return Y.Lang.sub(stockTemplate, {
        symbol : stock.Symbol,
        name : stock.Name,
        exchange : stock.Exchange
      });
    });
  }

  var inputNode  = Y.one('#ysearchinput');

  inputNode.plug(Y.Plugin.AutoComplete, {
    resultHighlighter: 'phraseMatch',
    resultTextLocator: 'Symbol',
    resultFormatter: stockFormatter,
    source: "select * from csv where url='http://dl.dropbox.com/u/15596789/tickerlist.csv' AND columns='Symbol,Name,Exchange' AND (Name Like '%{query}%')"
  });
});

function setStemWilt($img, val ) {

    var range = 16;
    var min = (range / 2) * -1;
    var max = (range / 2);
    var per = (val-min) / range;

    var sizeMin = 40;
    var sizeMax = 200;
    var sizeRange = sizeMax-sizeMin;

    per = Math.abs(per);
    var width = 200 - (per * sizeRange); // 200 x 40                                                             
    var height = 40 + (per * sizeRange); // 200 x 40                                                             

    $img.width( width );
    $img.height( height );

    var start = 100;                                                                                          
    var posY = (start + (250-height)) + "px";
    $img.css( {"top" : posY } );
}

function drawFlowers(data) {
  $('.stem,.flower').remove();

  for(var i= 0;i<data.flowers.length;i++) {
    var change = data.flowers[i].change, symbol = data.flowers[i].symbol;

    createStem(symbol, change, data.totals.min.change, data.totals.max.change, i, data.flowers.length);

  }

}

function createStem(symbol, change, min, max, pos, total) {
  var stem = 'stem.png';

  if(change > 0) {
    stem = 'stem-up.png';
  }

  max = 10;
  min = -10;

  var $img = $("<img>", {id:"stem-" + symbol, alt:symbol, "class": "stem",  src: "/images/" + stem});


  setStemWilt($img, change);

  $img.appendTo('#holder');

  var left = (($('#holder').width() / total) / 2) * pos;

  $('#stem-' + symbol).css('left', left);

  createFlower(symbol, (pos + 1));

}

function createFlower(symbol, pos) {
  $flower = $('<div>', {"class" : 'flower'})

  $flower.css('left', $('#stem-' + symbol).position().left + ($('#stem-' + symbol).width() - 52) );
  $flower.css('top',  $('#stem-' + symbol).position().top - (40/2) );

  $flower.addClass('color-' + pos);

  $flower.appendTo('#holder');
}

function updateStockPrices(stockSymbols) {
  $.ajax({url:'/flowerbed/' + stockSymbols, success: drawFlowers});
}

$('body').on('click', '#clear', clear);

// add stock
$('body').on('click', '#add', function(e) {

  var symbols;

  saveSymbol($('#ysearchinput').val());
  $('#ysearchinput').val('');

  symbols = getSymbols();
  updateStockPrices(symbols);
});

function getSymbols() {
  return sessionStorage.getItem("symbols");
}

function saveSymbol(symbol) {
  var symbols = getSymbols();

  if(symbols && symbols.indexOf(symbol) >=0 ) {
    return;
  }

  if(!symbols) {
    symbols = "";
  }

  symbols += (symbols.length > 0) ? "," + symbol :symbol;

  sessionStorage.setItem("symbols", symbols);
}

function clear() {
  sessionStorage.removeItem("symbols");
  $('.stem,.flower').remove();
}

$(function() {
  var symbols = getSymbols();

  if(symbols) 
    updateStockPrices(symbols);

});