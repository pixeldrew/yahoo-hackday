
/*
 * GET home page.
 */

var flowerbed = require('../flowerbed');

exports.index = function(req, res){
  res.render('index', { title: 'Flowerbed' });
};

exports.flowerbed = function(req, res) {

	var symbols = req.params.symbols.split(',');

	if(symbols.length == 1) symbols = symbols[0];
	
	flowerbed.getQuotes(res, symbols);	
}