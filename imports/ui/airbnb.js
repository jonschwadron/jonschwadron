import { Expenses } from '../api/expenses.js';
import { HTTP } from 'meteor/http';

import './expense.js';
import './airbnb.html';

//hide generator by default
Session.set('listingInfoState', true);
Session.set('generatorState', true);

Template.Airbnb.onRendered(function(){
    //jquery code
    $("#input-search").append("https://www.airbnb.com/rooms/1415908");
});

Template.Airbnb.helpers({

	showListing: function() {
		return Session.get('listingInfoState');
	},
	showGenerator: function() {
		return Session.get('generatorState');
	},
	expenses() {
		return Expenses.find({}, {
			sort: {
				createdAt: 0
			}
		});
	},
	total() {
		let sum = 0;
		let cursor = Expenses.find();

		cursor.forEach(function(item) {
			sum += parseInt(item.price);
		});

		let total = Math.ceil((sum + listingPrice) / 15)

		return total;
	},
	listingPrice() {
		return Session.get('price');
	},
	individualRoomPrice() {
		return Math.ceil( total / 15);
	}
});

Template.Airbnb.events({
	'focus #from': function() {
		$("#from").datepicker();
	},
	'focus #to': function() {
		$("#to").datepicker();
	},
	'click #listing-toggle': function() {
		if (Session.get('listingInfoState')) {
			Session.set('listingInfoState', false);
		} else {
			Session.set('listingInfoState', true);
		}

	},
	'click #itinerary-toggle': function() {
		if (Session.get('generatorState')) {
			Session.set('generatorState', false);
		} else {
			Session.set('generatorState', true);
		}

	},
	'submit .new-listing' (event) {
		event.preventDefault();

		const target = event.target;
		const listing = target.listing.value;

		var a = document.createElement('a');
		a.href = listing;

		var path = a['pathname'].split('/');
		var listingId = '';

		if (path.length > 3) {
			listingId = path[3];
		} else {
			listingId = path[2];
		}

		if (Meteor.isClient) {
			Meteor.call('getListing', listingId, function(error, result) {
				console.log(result.listing.cleaning_fee_native);

				Session.set({
					price: result.listing.price,
				});
			});
		}

		Session.set('listingInfoState', true);
		//target.listing.value = '';
	},
	'submit .new-expense' (event) {
		// Prevent default browser form submit
		event.preventDefault();

		// Get value from form element
		const target = event.target;
		const text = target.text.value;
		const price = target.price.value;

		//insert an expense into the Collection
		Expenses.insert({
			text,
			price,
			createdAt: new Date(), //current time
		});

		//clear form
		target.text.value = '';
		target.price.value = '';
	},
	'click #generate-button'() {
		console.log("[ #generate-button clicked. ]");
	},
});

console.log("airbnb.js loaded");
