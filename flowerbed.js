var flowerbed = {}

var YQL = require('YQL'), _ = require('underscore');

flowerbed.getQuotes = function(res,symbols) {

	new YQL.exec("select symbol,ChangeinPercent from yahoo.finance.quotes where symbol in (@symbols)", function(response) {

	if (response.error) {
		console.log(response.error.description);

	} else {

		var data = [];

		if(!response.query.results.quote.length) {
			var symbol  = response.query.results.quote.symbol,
	        change = response.query.results.quote.ChangeinPercent;

			change = parseFloat(change.replace(/\%/, ''), 10);
	        data.push({symbol: symbol, change:change});

		} else {
		
			for(var i=0;i<response.query.results.quote.length;i++) {

				var symbol  = response.query.results.quote[i].symbol,
	            change = response.query.results.quote[i].ChangeinPercent;

	           	change = parseFloat(change.replace(/\%/, ''), 10);
				data.push({symbol: symbol, change:change});
			}
		}
		
		var changef = function(f) {
        	return f.change;
        };

		var min = _.min(data, changef),max = _.max(data, changef);

        res.send({flowers:data, totals:{min: min, max: max}});
	}

	}, {"symbols": symbols});
	
};

module.exports = flowerbed;