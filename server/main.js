import { HTTP } from 'meteor/http';

import '../imports/api/expenses.js';

Meteor.startup(function() {
	// Listen to incoming HTTP requests, can only be used on the server
	WebApp.connectHandlers.use(function(req, res, next) {
		res.setHeader("Access-Control-Allow-Origin", "*");
		return next();
	});
})

if (Meteor.isServer) {
	Meteor.methods({
		'getListing' (listingId, callback) {
			this.unblock();
			var clientId = '3092nxybyb0otqw18e8nh5nty';
			var format = 'v1_legacy_for_p3';

			var apiUrl = 'https://api.airbnb.com/v2/listings/' + listingId;

			var result = HTTP.get(apiUrl, {
				headers: {
      				'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
				},
				params: {
					'client_id': clientId,
					'_format': format
				}
			});

			if(result.statusCode==200) {
				return JSON.parse(result.content);
			} else {
				var errorJson = JSON.parse(result.content);
				throw new Meteor.Error(result.statusCode, errorJson.error);
			}
		}
	});
}
