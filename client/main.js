import { Template } from 'meteor/templating';

import '../imports/ui/bootstrap.min.css';
import '../imports/ui/jquery-ui.min.css';
import '../imports/api/bootstrap.min.js';
import '../imports/api/jquery-ui.min.js';
import '../imports/api/jquery.ui.touch-punch.min.js';
import './main.html';
import '../imports/api/typed.js';


Router.route('/', function () {
  this.render('home');
});
Router.route('/projects');
Router.route('/resume');

if (Meteor.isClient) {

	Template.resume.onRendered(function(){
		$("#timeline li").each(function(index) {
		    $(this).delay(500 * index).fadeIn(1500);
		});

		this.$('#timeEntry1').typed({
			strings: ["Burlington Bytes<br>Location: Burlington, VT<br>Joined: March 2016<br>Left: September 2016<br>Position: Tech Support & Web Developer<br>Experience/skills acquired: Wordpress, Zendesk, Git"],
			contentType: 'html',
			typeSpeed: -40,
			startDelay: 500,
			showCursor: false
		});

		this.$('#timeEntry2').typed({
			strings: ["General Assembly<br>Location: New York, NY<br>Joined: September 2015<br>Experience/skills Acquired: SCSS, Node.js, Express.js, Angular, MongoDB, Ruby on Rails<br>"],
			contentType: 'html',
			typeSpeed: -40,
			startDelay: 500*2,
			showCursor: false
		});

		this.$('#timeEntry3').typed({
			strings: ["CultureIQ<br>Location: New York, NY<br>Joined: July 2015<br>Left: August 2015<br>Position: Full Stack Developer<br>Experience/skills: acquired: Django, Angular, PostgreSQL, Git"],
			contentType: 'html',
			typeSpeed: -40,
			startDelay: 500*3,
			showCursor: false
		});

		this.$('#timeEntry4').typed({
			strings: ["Replica Labs<br>Location: Boulder, CO<br>Joined: October 2014<br>Left: December 2015<br>Position: Software Engineer<br>Remote: Yes<br>Experience/skills acquired: DevOps, Chef, Ansible"],
			contentType: 'html',
			typeSpeed: -40,
			startDelay: 500*4,
			showCursor: false
		});

		this.$('#timeEntry5').typed({
			strings: ["Farmingdale State University of New York<br>Location: Farmingdale, NY<br>Graduated: September 2014<br>Major: Computer Programming & Information Systems<br>Degree: Bachelor of Science<br>Experience/skills acquired: C++, Java, Android Development"],
			contentType: 'html',
			typeSpeed: -40,
			startDelay: 500*5,
			showCursor: false
		});

		this.$('#timeEntry6').typed({
			strings: ["Freelance IT<br>Location: Orange County, NY<br>Joined: March 2008<br>Left: August 2012<br>Work Type: Onsite & Remote<br>Experience/skills acquired: Built custom gaming PCs, CPU/GPU overclocking, repaired overheating issues, malwares removal, performance optimizations, data recovery, improved home wireless networks."],
			contentType: 'html',
			typeSpeed: -40,
			startDelay: 500*6,
			showCursor: false
		});

		this.$('#timeEntry7').typed({
			strings: ["NTID @ Rochester Institute of Technology<br>Location: Rochester, NY<br>Graduated: 2010<br>Major: Applied Computer Technology<br>Degree: Associates of Applied Science<br>Experience/skills acquired: Logic Fundamentals, Electronics, Networking, Security, C++, Web Development"],
			contentType: 'html',
			typeSpeed: -40,
			startDelay: 500*6,
			showCursor: false
		});

		this.$('#timeEntry8').typed({
			strings: ["Sullivan BOCES<br>Location: Liberty, NY<br>Position: Network Technician<br>Joined: May 2008<br>Left: August 2008<br>Industry: Education<br>Work Type: Internship<br>Experience/skills acquired: Desktop setup, Networked printer troubleshooting, Server configuration, Active Directory"],
			contentType: 'html',
			typeSpeed: -40,
			startDelay: 500*6,
			showCursor: false
		});

		this.$('#timeEntry9').typed({
			strings: ["Orange-Ulster BOCES<br>Location: Goshen, NY<br>Graduated: June 2003<br>Major: Computer Programming<br>Experience/skills acquired; <br>  "],
			contentType: 'html',
			typeSpeed: -40,
			startDelay: 500*6,
			showCursor: false
		});


	});

	Template.projects.onRendered(function () {
		Meteor.setInterval(function(){
			// var elem = document.getElementById('robot-message');
		    // elem.scrollTop = elem.scrollHeight;
			var messageWindow = this.$('#robot-message');
			var scrollHeight = messageWindow.prop('scrollHeight');
			messageWindow.stop().animate({scrollTop: scrollHeight}, 550);
		}, 150);

		this.$('.darth-plagueis-story').typed({
			strings: ["Did you ever hear the tragedy of Darth Plagueis the Wise?^1400<br><br>No?^1000 I thought not.^1250 It's not a story the Jedi would tell you.^1400<br><br>It's a Sith legend.^1250 Darth Plagueis^500 was a Dark Lord of the Sith^750 so powerful and so wise,^750 he could use the Force to influence the midi-chlorians^1100<br><br>^to create^1400 life.^1500<br><br>He had such a knowledge of the Dark Side,^750 he could even keep the ones he cared about^600 from dying.^2000 He became so powerful,^1000 the only thing he was afraid of was^250 losing his power^250 which, eventually of course,^250 he did.^1500 Unfortunately,^1000 he taught his apprentice^300 everything he knew.^1250 Then his apprentice killed him in his sleep.^2000<br><br>Ironic.^1250<br><br>He could save others from death...^1800 but not himself."],
			typeSpeed: -50,
			startDelay: 2000,
			showCursor: false
		});

		$( "#slider-salary" ).slider({
			value: 50000,
			// range: true,
			min: 1000,
			max: 500000,
			// values: [ 50000, 70000 ],
			slide: function( event, ui ) {
				$( "#user-salary" ).val( "$" + ui.value );
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

		$( "#slider-expense" ).slider({
			range: true,
			min: 0,
			max: 5000,
			values: [ 750, 1250 ],
			slide: function( event, ui ) {
				$( "#user-expense" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
				updateTotal();
			}
		});

		$( "#user-salary" ).val( "$" + $( "#slider-salary" ).slider( "value" ) );
		$( "#user-expense" ).val( "$" + $( "#slider-expense" ).slider( "values", 0 )
		+ " - $" + $( "#slider-expense" ).slider( "values", 1 ) );

		$( "#slider-salary" ).draggable();
		$( "#slider-expense" ).draggable();

		function updateTotal() {
			$salary = $("#slider-salary").slider("value");
			$minExpense = $("#slider-expense").slider("values", 0);
			$maxExpense = $("#slider-expense").slider("values", 1);

			//assign tax bracket
			if ($salary <= 9225) { $taxBracket = 10; }
			else if ($salary >= 9226 && $salary <= 37450 ) { $taxBracket = 15; }
			else if ($salary >= 37451 && $salary <= 90750) { $taxBracket = 25; }
			else if ($salary >= 90751 && $salary <= 189300) { $taxBracket = 28; }
			else if ($salary >= 189301 && $salary <= 411500) { $taxBracket = 33; }
			else if ($salary >= 411501 && $salary <= 413200) { $taxBracket = 35; }
			else if ($salary >= 413201) { $taxBracket = 39.6; }

			//factor in tax
			$salary = $salary - (($taxBracket / 100) * $salary) ;

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
