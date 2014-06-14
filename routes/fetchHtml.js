"use strict";

var util = require('util');
var request = require('request');


var fetchHTML = {
	fetchData : function(req, res, next){
		var options = {
		  host: 'http://www.google.com',
		  port: 80,
		  path: '/index.html'
		};

		request('http://www.google.com', function(err, res, body) {
			console.log(body);
			return res.json(body);
		});
	}
};
module.exports = fetchHTML;
