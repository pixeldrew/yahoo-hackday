
/*
 * GET home page.
 */

var flowerbed = require('../flowerbed');

exports.index = function(req, res){
  res.render('index', { title: 'Flowerbed' });
};

exports.flowerbed = function(req, res) {
	res.render('index', { title: 'Flowerbed' });	
	flowerbed.getQuotes();
}