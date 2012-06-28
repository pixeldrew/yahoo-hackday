var flowerbed = {}

var YQL = require('YQL');

flowerbed.getQuotes = function() {

	console.log('getQuotes');

	new YQL.exec("select * from yahoo.finance.quotes where symbol in (@symbols)", function(response) {

	if (response.error) {
		console.log("Example #1... Error: " + response.error.description);
	} else {

		for(var i=0;i<response.query.results.quote.length;i++) {
			var symbol  = response.query.results.quote[i].symbol,
            change = response.query.results.quote[i].Change;

			console.log(symbol, change);

		}
        
	}

	}, {"symbols": ["YHOO","AAPL","GOOG","MSFT"]});
	
};

module.exports = flowerbed;