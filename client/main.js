import { Template } from 'meteor/templating';

import '../imports/ui/bootstrap.min.css';
import '../imports/ui/jquery-ui.min.css';
import '../imports/ui/jquery.offcanvas.min.css';
import '../imports/api/bootstrap.min.js';
import '../imports/api/jquery-ui.min.js';
import '../imports/api/jquery.ui.touch-punch.min.js';
import '../imports/api/jquery.offcanvas.min.js';
import '../imports/api/jquery.simpleWeather.min.js';
import '../imports/api/typed.js';

import '../imports/ui/airbnb.js';

import './main.html';
import './rssfeed.js';


// Router.configure({
// 	layoutTemplate: 'Header'  //can be any template name
// });


Router.route('/', function () {
	this.render('Overview');
});

Router.route('/rssfeed', function () {
	this.render('RssFeed');
});

Router.route('/resume', function () {
	this.render('Resume');
});

Router.route('/work', function () {
	this.render('Work');
});

Router.route('/darth-plagueis', function () {
	this.render('DarthPlagueis');
});

Router.route('/pokebox-css', function () {
	this.render('PokeboxCSS');
});

Router.route('/happiness-calculator', function () {
	this.render('HappinessCalculator');
});

Router.route('/timeline', function () {
	this.render('Timeline');
});

Router.route('/grocery-app', function () {
	this.render('GroceryApp');
});

Router.route('/fingr', function () {
	this.render('Fingr');
});

Router.route('/fsc-virtual-id', function () {
	this.render('FSCVirtualID');
});

Router.route('/ansible', function () {
	this.render('Ansible');
});

Router.route('/chef', function () {
	this.render('Chef');
});

Router.route('/cool', function () {
	this.render('Cool');
});

Router.route('/contact', function () {
	this.render('Contact');
});

Router.route('/airbnb', function () {
	this.render('Airbnb');
});

Router.route('/django-rating-system', function () {
	this.render('DjangoRatingSystem');
});

Router.route('/tictactoeonline', function () {
	this.render('TicTacToeOnline');
});

Router.route('/beautiful-rss', function () {
	this.render('BeautifulRss');
});




if (Meteor.isClient) {
	//hide generator by default
	// Session.set('menuState', true);
	// Session.set('menuState', true);

	// Template.Menu.events({
	// 	'click #menubutton': function() {
	// 		if (Session.get('menuState')) {
	// 			Session.set('menuState', false);
	// 		} else {
	// 			Session.set('menuState', true);
	// 		}
	// 	}
	// });

	// Template.Menu.onRendered(function () {
	// 	/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
	// 	function openNav() {
	// 		document.getElementById("mySidenav").style.width = "250px";
	// 		document.getElementById("main").style.marginLeft = "250px";
	// 		document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
	// 	}

	// 	/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
	// 	function closeNav() {
	// 		document.getElementById("mySidenav").style.width = "0";
	// 		document.getElementById("main").style.marginLeft = "0";
	// 		document.body.style.backgroundColor = "white";
	// 	}
	// });
	
	Template.Overview.events({
		'click #emailcopiednotify'() {
			var email = document.getElementById("sb-email");
			email.className = "show";
			setTimeout(
				function () {
					email.className = email.className.replace("show", "");
				}, 3000);
		},

		'click #githubnotify'() {
			var git = document.getElementById("sb-git");
			git.className = "show";
			setTimeout(function () {
				git.className = git.className.replace("show", "");
				window.open('https://github.com/jonschwadron');
			}, 1000);
		},

		'click #linkedinnotify'() {
			var lin = document.getElementById("sb-linkedin");
			lin.className = "show";
			setTimeout(function () {
				lin.className = lin.className.replace("show", "");
				window.open('https://www.linkedin.com/in/jonschwadron');
			}, 1000);
		},

		'click #ganotify'() {
			var ga = document.getElementById("sb-ga");
			ga.className = "show";
			setTimeout(function () {
				ga.className = ga.className.replace("show", "");
				window.open('https://profiles.generalassemb.ly/profiles/jonschwadron');
			}, 1000);
		}
	});

	Template.Overview.onRendered(function () {
		$(document).ready(function () {
			//simpleweatherjs
			loadWeather('Kansas City', ''); //@params location, woeid
		});

		function loadWeather(location, woeid) {
			$.simpleWeather({
				location: location,
				woeid: woeid,
				unit: 'f',
				success: function (weather) {
					html = '<h2><i id="weathericons" class="icon-' + weather.code + '"></i> ' + weather.temp + '&deg;' + weather.units.temp + '</h2>';
					html += '<ul><li>' + weather.city + ', ' + weather.region + '</li>';

					$("#weather").html(html);
				},
				error: function (error) {
					$("#weather").html('<p>' + error + '</p>');
				}
			});
		}

	});

	Template.Contact.helpers({
		mapOptions: function () {
			// Make sure the maps API has loaded
			if (GoogleMaps.loaded()) {
				// Map initialization options
				return {
					center: new google.maps.LatLng(39.099726, -94.576629),
					zoom: 14,
					disableDefaultUI: true,
					draggable: false,
					scrollwheel: false,
					panControl: false,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				};
			}
		}
	});

	Template.Contact.onCreated(function () {
		new Clipboard('.btn');
	});

	Template.Contact.events({
		'click .btn'() {
			var email = document.getElementById("sb-email");
			email.className = "show";
			setTimeout(
				function () {
					email.className = email.className.replace("show", "");
				}, 3000);
		}
	});

	Template.Contact.onRendered(function () {
		GoogleMaps.load({ key: 'AIzaSyBO04ekYQ1HfR856AIU3HLvsljXDIGMF0c' });
	});

	Template.Resume.onRendered(function () {
		$(document).ready(function () {
			var w = 600,
				h = 600;

			var colorscale = d3.scale.category10();

			//Legend titles
			var LegendOptions = ['A', 'B'];

			//Data
			var d = [

				[
					{ axis: "Git", value: 0.9 },
					{ axis: "Windows", value: 0.8 },
					{ axis: "macOS", value: 0.9 },
					{ axis: "Ubuntu", value: 0.8 },
					{ axis: "Virtualization", value: 0.65 },
					{ axis: "CDN", value: 0.55 },
					{ axis: "WPEngine", value: 0.75 },
					{ axis: "WooCommerce", value: 0.65 },
					{ axis: "WordPress", value: 0.75 },
					{ axis: "Python", value: 0.65 },
					{ axis: "Java", value: 0.55 },
					{ axis: "C++", value: 0.45 },
					{ axis: "React-Native", value: 0.3 },
					{ axis: "Android SDK", value: 0.5 },
					{ axis: "Ansible", value: 0.33 },
					{ axis: "Chef", value: 0.33 },
					{ axis: "Heroku", value: 0.55 },
					{ axis: "AWS EC2", value: 0.40 },
					{ axis: "Firebase", value: 0.6 },
					{ axis: "MySQL", value: 0.5 },
					{ axis: "Postgres", value: 0.65 },
					{ axis: "Django", value: 0.70 },
					{ axis: "Node.js", value: 0.65 },
					{ axis: "PHP", value: 0.6 },
					{ axis: "API", value: 0.65 },
					{ axis: "Meteor", value: 0.8 },
					{ axis: "React", value: 0.35 },
					{ axis: "Angular 1", value: 0.6 },
					{ axis: "jQuery", value: 0.78 },
					{ axis: "JavaScript", value: 0.85 },
					{ axis: "CSS", value: 0.9 },
					{ axis: "HTML", value: 0.95 },

				],
				
			];

			//Options for the Radar chart, other than default
			var mycfg = {
				w: w,
				h: h,
				maxValue: 1,
				levels: 8,
				ExtraWidthX: 150,
			}

			//Call function to draw the Radar chart
			//Will expect that data is in %'s
			RadarChart.draw("#chart", d, mycfg);

			////////////////////////////////////////////
			/////////// Initiate legend ////////////////
			////////////////////////////////////////////

			var svg = d3.select('#body')
				.selectAll('svg')
				.append('svg')
				.attr("width", w + 300)
				.attr("height", h)

			//Create the title for the legend
			var text = svg.append("text")
				.attr("class", "title")
				.attr('transform', 'translate(90,0)')
				.attr("x", w - 70)
				.attr("y", 10)
				.attr("font-size", "12px")
				.attr("fill", "#404040")
				.text("What % of owners use a specific service in a week");

			//Initiate Legend	
			var legend = svg.append("g")
				.attr("class", "legend")
				.attr("height", 100)
				.attr("width", 200)
				.attr('transform', 'translate(90,20)')
				;
			//Create colour squares
			legend.selectAll('rect')
				.data(LegendOptions)
				.enter()
				.append("rect")
				.attr("x", w - 65)
				.attr("y", function (d, i) { return i * 20; })
				.attr("width", 10)
				.attr("height", 10)
				.style("fill", function (d, i) { return colorscale(i); })
				;
			//Create text next to squares
			legend.selectAll('text')
				.data(LegendOptions)
				.enter()
				.append("text")
				.attr("x", w - 52)
				.attr("y", function (d, i) { return i * 20 + 9; })
				.attr("font-size", "11px")
				.attr("fill", "#737373")
				.text(function (d) { return d; })
				;
		});

		var RadarChart = {
			draw: function (id, d, options) {
				var cfg = {
					radius: 5,
					w: 600,
					h: 600,
					factor: 1,
					factorLegend: .85,
					levels: 3,
					maxValue: 0,
					radians: 2 * Math.PI,
					opacityArea: 0.5,
					ToRight: 5,
					TranslateX: 80,
					TranslateY: 30,
					ExtraWidthX: 100,
					ExtraWidthY: 100,
					// color: d3.scale.category10()
					color: d3.scale.linear().domain([1, length])
						.interpolate(d3.interpolateHcl)
						.range([d3.rgb("#007AFF"), d3.rgb('#FF3F34')])
				};
				
				if ('undefined' !== typeof options) {
					for (var i in options) {
						if ('undefined' !== typeof options[i]) {
							cfg[i] = options[i];
						}
					}
				}
				cfg.maxValue = Math.max(cfg.maxValue, d3.max(d, function (i) { return d3.max(i.map(function (o) { return o.value; })) }));
				var allAxis = (d[0].map(function (i, j) { return i.axis }));
				var total = allAxis.length;
				var radius = cfg.factor * Math.min(cfg.w / 2, cfg.h / 2);
				var Format = d3.format('%');
				d3.select(id).select("svg").remove();

				var g = d3.select(id)
					.append("svg")
					.attr("width", cfg.w + cfg.ExtraWidthX)
					.attr("height", cfg.h + cfg.ExtraWidthY)
					.append("g")
					.attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")");
				;

				var tooltip;

				//Circular segments
				for (var j = 0; j < cfg.levels - 1; j++) {
					var levelFactor = cfg.factor * radius * ((j + 1) / cfg.levels);
					g.selectAll(".levels")
						.data(allAxis)
						.enter()
						.append("svg:line")
						.attr("x1", function (d, i) { return levelFactor * (1 - cfg.factor * Math.sin(i * cfg.radians / total)); })
						.attr("y1", function (d, i) { return levelFactor * (1 - cfg.factor * Math.cos(i * cfg.radians / total)); })
						.attr("x2", function (d, i) { return levelFactor * (1 - cfg.factor * Math.sin((i + 1) * cfg.radians / total)); })
						.attr("y2", function (d, i) { return levelFactor * (1 - cfg.factor * Math.cos((i + 1) * cfg.radians / total)); })
						.attr("class", "line")
						.style("stroke", "grey")
						.style("stroke-opacity", "0.75")
						.style("stroke-width", "0.3px")
						.attr("transform", "translate(" + (cfg.w / 2 - levelFactor) + ", " + (cfg.h / 2 - levelFactor) + ")");
				}

				//Text indicating at what % each level is
				for (var j = 0; j < cfg.levels; j++) {
					var levelFactor = cfg.factor * radius * ((j + 1) / cfg.levels);
					g.selectAll(".levels")
						.data([1]) //dummy data
						.enter()
						.append("svg:text")
						.attr("x", function (d) { return levelFactor * (1 - cfg.factor * Math.sin(0)); })
						.attr("y", function (d) { return levelFactor * (1 - cfg.factor * Math.cos(0)); })
						.attr("class", "legend")
						.style("font-family", "sans-serif")
						.style("font-size", "10px")
						.attr("transform", "translate(" + (cfg.w / 2 - levelFactor + cfg.ToRight) + ", " + (cfg.h / 2 - levelFactor) + ")")
						.attr("fill", "#737373")
						.text(Format((j + 1) * cfg.maxValue / cfg.levels));
				}

				series = 0;

				var axis = g.selectAll(".axis")
					.data(allAxis)
					.enter()
					.append("g")
					.attr("class", "axis");

				axis.append("line")
					.attr("x1", cfg.w / 2)
					.attr("y1", cfg.h / 2)
					.attr("x2", function (d, i) { return cfg.w / 2 * (1 - cfg.factor * Math.sin(i * cfg.radians / total)); })
					.attr("y2", function (d, i) { return cfg.h / 2 * (1 - cfg.factor * Math.cos(i * cfg.radians / total)); })
					.attr("class", "line")
					.style("stroke", "grey")
					.style("stroke-width", "1px");

				axis.append("text")
					.attr("class", "legend")
					.text(function (d) { return d })
					.style("font-family", "sans-serif")
					.style("font-size", "11px")
					.attr("text-anchor", "middle")
					.attr("dy", "1.5em")
					.attr("transform", function (d, i) { return "translate(0, -10)" })
					.attr("x", function (d, i) { return cfg.w / 2 * (1 - cfg.factorLegend * Math.sin(i * cfg.radians / total)) - 60 * Math.sin(i * cfg.radians / total); })
					.attr("y", function (d, i) { return cfg.h / 2 * (1 - Math.cos(i * cfg.radians / total)) - 20 * Math.cos(i * cfg.radians / total); });


				d.forEach(function (y, x) {
					dataValues = [];
					g.selectAll(".nodes")
						.data(y, function (j, i) {
							dataValues.push([
								cfg.w / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.sin(i * cfg.radians / total)),
								cfg.h / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.cos(i * cfg.radians / total))
							]);
						});
					dataValues.push(dataValues[0]);
					g.selectAll(".area")
						.data([dataValues])
						.enter()
						.append("polygon")
						.attr("class", "radar-chart-serie" + series)
						.style("stroke-width", "2px")
						.style("stroke", cfg.color(series))
						.attr("points", function (d) {
							var str = "";
							for (var pti = 0; pti < d.length; pti++) {
								str = str + d[pti][0] + "," + d[pti][1] + " ";
							}
							return str;
						})
						.style("fill", function (j, i) { return cfg.color(series) })
						.style("fill-opacity", cfg.opacityArea)
						.on('mouseover', function (d) {
							z = "polygon." + d3.select(this).attr("class");
							g.selectAll("polygon")
								.transition(200)
								.style("fill-opacity", 0.1);
							g.selectAll(z)
								.transition(200)
								.style("fill-opacity", .7);
						})
						.on('mouseout', function () {
							g.selectAll("polygon")
								.transition(200)
								.style("fill-opacity", cfg.opacityArea);
						});
					series++;
				});
				series = 0;


				d.forEach(function (y, x) {
					g.selectAll(".nodes")
						.data(y).enter()
						.append("svg:circle")
						.attr("class", "radar-chart-serie" + series)
						.attr('r', cfg.radius)
						.attr("alt", function (j) { return Math.max(j.value, 0) })
						.attr("cx", function (j, i) {
							dataValues.push([
								cfg.w / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.sin(i * cfg.radians / total)),
								cfg.h / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.cos(i * cfg.radians / total))
							]);
							return cfg.w / 2 * (1 - (Math.max(j.value, 0) / cfg.maxValue) * cfg.factor * Math.sin(i * cfg.radians / total));
						})
						.attr("cy", function (j, i) {
							return cfg.h / 2 * (1 - (Math.max(j.value, 0) / cfg.maxValue) * cfg.factor * Math.cos(i * cfg.radians / total));
						})
						.attr("data-id", function (j) { return j.axis })
						.style("fill", cfg.color(series)).style("fill-opacity", .9)
						.on('mouseover', function (d) {
							newX = parseFloat(d3.select(this).attr('cx')) - 10;
							newY = parseFloat(d3.select(this).attr('cy')) - 5;

							tooltip
								.attr('x', newX)
								.attr('y', newY)
								.text(Format(d.value))
								.transition(200)
								.style('opacity', 1);

							z = "polygon." + d3.select(this).attr("class");
							g.selectAll("polygon")
								.transition(200)
								.style("fill-opacity", 0.1);
							g.selectAll(z)
								.transition(200)
								.style("fill-opacity", .7);
						})
						.on('mouseout', function () {
							tooltip
								.transition(200)
								.style('opacity', 0);
							g.selectAll("polygon")
								.transition(200)
								.style("fill-opacity", cfg.opacityArea);
						})
						.append("svg:title")
						.text(function (j) { return Math.max(j.value, 0) });

					series++;
				});
				//Tooltip
				tooltip = g.append('text')
					.style('opacity', 0)
					.style('font-family', 'sans-serif')
					.style('font-size', '13px');
			}
		};
	});

	Template.Timeline.onRendered(function () {
		this.$('#bbytes').hover(function () {
			$('#bbytes-logo').css('transition', 'all 0.5s');
			$('#bbytes-logo').css('visibility', 'visible');
			$('#bbytes-logo').css('transform', 'translateX(0px)');
		}, function () {
			// on mouseout, reset the background colour
			$('#bbytes-logo').css('visibility', '');
			$('#bbytes-logo').css('transform', '');
		});

		this.$('#ga').hover(function () {
			$('#ga-logo').css('transition', 'all 0.5s');
			$('#ga-logo').css('visibility', 'visible');
			$('#ga-logo').css('transform', 'translateX(0px)');
		}, function () {
			$('#ga-logo').css('visibility', '');
			$('#ga-logo').css('transform', '');
		});

		this.$('#ciq').hover(function () {
			$('#ciq-logo').css('transition', 'all 0.5s');
			$('#ciq-logo').css('visibility', 'visible');
			$('#ciq-logo').css('transform', 'translateX(0px)');
		}, function () {
			$('#ciq-logo').css('visibility', '');
			$('#ciq-logo').css('transform', '');
		});

		this.$('#rlabs').hover(function () {
			$('#rlabs-logo').css('transition', 'all 0.5s');
			$('#rlabs-logo').css('visibility', 'visible');
			$('#rlabs-logo').css('transform', 'translateX(0px)');
		}, function () {
			$('#rlabs-logo').css('visibility', '');
			$('#rlabs-logo').css('transform', '');
		});

		this.$('#fdale').hover(function () {
			$('#fdale-logo').css('transition', 'all 0.5s');
			$('#fdale-logo').css('visibility', 'visible');
			$('#fdale-logo').css('transform', 'translateX(0px)');
		}, function () {
			$('#fdale-logo').css('visibility', '');
			$('#fdale-logo').css('transform', '');
		});

		this.$('#freelance').hover(function () {
			$('#freelance-logo').css('transition', 'all 0.5s');
			$('#freelance-logo').css('visibility', 'visible');
			$('#freelance-logo').css('transform', 'translateX(0px)');
		}, function () {
			$('#freelance-logo').css('visibility', '');
			$('#freelance-logo').css('transform', '');
		});

		this.$('#ritntid').hover(function () {
			$('#ritntid-logo').css('transition', 'all 0.5s');
			$('#ritntid-logo').css('visibility', 'visible');
			$('#ritntid-logo').css('transform', 'translateX(0px)');
		}, function () {
			$('#ritntid-logo').css('visibility', '');
			$('#ritntid-logo').css('transform', '');
		});

		this.$('#scboces').hover(function () {
			$('#scboces-logo').css('transition', 'all 0.5s');
			$('#scboces-logo').css('visibility', 'visible');
			$('#scboces-logo').css('transform', 'translateX(0px)');
		}, function () {
			$('#scboces-logo').css('visibility', '');
			$('#scboces-logo').css('transform', '');
		});

		this.$('#ouboces').hover(function () {
			$('#ouboces-logo').css('transition', 'all 0.5s');
			$('#ouboces-logo').css('visibility', 'visible');
			$('#ouboces-logo').css('transform', 'translateX(0px)');
		}, function () {
			$('#ouboces-logo').css('visibility', '');
			$('#ouboces-logo').css('transform', '');
		});

		this.$('#timeline li').each(function (index) {
			$(this).delay(300 * index).fadeIn(1000);
		});

		this.$('#timeEntry1').typed({
			strings: ["Burlington, VT<br>Category: Internet Marketing<br>Joined: March 2016<br>Left: September 2016<br>Position: Tech Support &amp; Web Developer<br>Experience/skills acquired: Wordpress, Zendesk, Git"],
			contentType: 'html',
			typeSpeed: -25,
			startDelay: 750,
			showCursor: false
		});

		this.$('#timeEntry2').typed({
			strings: ["New York, NY<br>Joined: September 2015<br>Cohort: Web Development Immersive<br>Experience/skills acquired: SCSS, Node.js, Express.js, Angular, MongoDB, Ruby on Rails<br>"],
			contentType: 'html',
			typeSpeed: -25,
			startDelay: 750 * 2,
			showCursor: false
		});

		this.$('#timeEntry3').typed({
			strings: ["New York, NY<br>Category: Data Visualizaiton<br>Joined: July 2015<br>Left: August 2015<br>Position: Full Stack Developer<br>Experience/skills: acquired: Django, Angular, PostgreSQL, Git"],
			contentType: 'html',
			typeSpeed: -25,
			startDelay: 750 * 3,
			showCursor: false
		});

		this.$('#timeEntry4').typed({
			strings: ["Boulder, CO<br>Category: 3D Technology<br>Joined: October 2014<br>Left: December 2015<br>Position: Software Engineer<br>Remote: Yes<br>Experience/skills acquired: DevOps, Chef, Ansible"],
			contentType: 'html',
			typeSpeed: -25,
			startDelay: 750 * 4,
			showCursor: false
		});

		this.$('#timeEntry5').typed({
			strings: ["Farmingdale, NY<br>Graduated: September 2014<br>Major: Computer Programming &amp; Information Systems<br>Degree: Bachelor of Science<br>Experience/skills acquired: C++, Java, Android Development"],
			contentType: 'html',
			typeSpeed: -25,
			startDelay: 750 * 5,
			showCursor: false
		});

		this.$('#timeEntry6').typed({
			strings: ["Orange County, NY<br>Category: Information Technology<br>Joined: March 2008<br>Left: August 2012<br>Experience/skills acquired: Built custom gaming PCs, CPU/GPU overclocking, repaired overheating issues, malwares removal, performance optimizations, data recovery, improved home wireless networks."],
			contentType: 'html',
			typeSpeed: -25,
			startDelay: 750 * 6,
			showCursor: false
		});

		this.$('#timeEntry7').typed({
			strings: ["Rochester, NY<br>Graduated: 2010<br>Major: Applied Computer Technology<br>Degree: Associates of Applied Science<br>Experience/skills acquired: Logic Fundamentals, Electronics, Networking, Security, C++, Web Development"],
			contentType: 'html',
			typeSpeed: -25,
			startDelay: 750 * 7,
			showCursor: false
		});

		this.$('#timeEntry8').typed({
			strings: ["Liberty, NY<br>Category: Education<br>Position: Network Technician (internship)<br>Joined: May 2008<br>Left: August 2008<br>Experience/skills acquired: Desktop setup, Networked printer troubleshooting, Server configuration, Active Directory"],
			contentType: 'html',
			typeSpeed: -25,
			startDelay: 750 * 8,
			showCursor: false
		});

		this.$('#timeEntry9').typed({
			strings: ["Goshen, NY<br>Graduated: June 2003<br>Major: Computer Programming<br>Experience/skills acquired: Visual Basic, C++ <br>  "],
			contentType: 'html',
			typeSpeed: -25,
			startDelay: 750 * 9,
			showCursor: false
		});
	});

	Template.DarthPlagueis.onRendered(function () {
		Meteor.setInterval(function () {
			// var elem = document.getElementById('robot-message');
			// elem.scrollTop = elem.scrollHeight;
			var messageWindow = this.$('#robot-message');
			var scrollHeight = messageWindow.prop('scrollHeight');
			messageWindow.stop().animate({ scrollTop: scrollHeight }, 550);
		}, 150);

		this.$('.darth-plagueis-story').typed({
			strings: ["Did you ever hear the tragedy of Darth Plagueis the Wise?^1400<br><br>No?^1000 I thought not.^1250 It's not a story the Jedi would tell you.^1400<br><br>It's a Sith legend.^1250 Darth Plagueis^500 was a Dark Lord of the Sith^750 so powerful and so wise,^750 he could use the Force to influence the midi-chlorians^1100<br><br>^to create^1400 life.^1500<br><br>He had such a knowledge of the Dark Side,^750 he could even keep the ones he cared about^600 from dying.^2000 He became so powerful,^1000 the only thing he was afraid of was^250 losing his power^250 which, eventually of course,^250 he did.^1500 Unfortunately,^1000 he taught his apprentice^300 everything he knew.^1250 Then his apprentice killed him in his sleep.^2000<br><br>Ironic.^1250<br><br>He could save others from death...^1800 but not himself."],
			typeSpeed: -50,
			startDelay: 2000,
			showCursor: false
		});
	});

	Template.HappinessCalculator.onRendered(function () {
		$("#slider-salary").slider({
			value: 50000,
			min: 1000,
			max: 500000,
			slide: function (event, ui) {
				$("#user-salary").val("$" + ui.value);
				// $( "#user-salary" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
				updateTotal();
			}
		});

		// $( "#slider-tax" ).slider({
		// 	value: 25,
		// 	min: 10,
		// 	max: 40,
		// 	slide: function( event, ui ) {
		// 		$( "#user-tax" ).val( "$" + ui.values );
		// 		updateTotal();
		// 	}
		// });

		$("#slider-expense").slider({
			range: true,
			min: 0,
			max: 5000,
			values: [750, 1250],
			slide: function (event, ui) {
				$("#user-expense").val("$" + ui.values[0] + " - $" + ui.values[1]);
				updateTotal();
			}
		});

		$("#user-salary").val("$" + $("#slider-salary").slider("value"));
		$("#user-expense").val("$" + $("#slider-expense").slider("values", 0)
			+ " - $" + $("#slider-expense").slider("values", 1));

		$("#slider-salary").draggable();
		$("#slider-expense").draggable();

		function updateTotal() {
			$salary = $("#slider-salary").slider("value");
			$minExpense = $("#slider-expense").slider("values", 0);
			$maxExpense = $("#slider-expense").slider("values", 1);

			//assign tax bracket
			if ($salary <= 9225) { $taxBracket = 10; }
			else if ($salary >= 9226 && $salary <= 37450) { $taxBracket = 15; }
			else if ($salary >= 37451 && $salary <= 90750) { $taxBracket = 25; }
			else if ($salary >= 90751 && $salary <= 189300) { $taxBracket = 28; }
			else if ($salary >= 189301 && $salary <= 411500) { $taxBracket = 33; }
			else if ($salary >= 411501 && $salary <= 413200) { $taxBracket = 35; }
			else if ($salary >= 413201) { $taxBracket = 39.6; }

			//factor in tax
			$salary = $salary - (($taxBracket / 100) * $salary);

			//convert to biweekly
			$minBiWeekly = $salary / 26;
			$maxBiWeekly = $salary / 26;

			//convert to monthly
			$minTotal = Math.round(($minBiWeekly * 2) - $minExpense);
			$maxTotal = Math.round(($maxBiWeekly * 2) - $maxExpense);

			$("#user-tax").val($taxBracket + "%");
			$("#total").val("$" + $maxTotal + " to $" + $minTotal);
		}
	});
}
