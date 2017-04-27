import { Template } from 'meteor/templating';

import '../imports/api/bootstrap.min.js';
import '../imports/api/jquery-ui.min.js';
import '../imports/api/typed.js';
import '../imports/api/jquery.ui.touch-punch.min.js';
import '../imports/ui/bootstrap.min.css';
import '../imports/ui/jquery-ui.min.css';
import './main.html';

Router.route('/', function () {
  this.render('home');
});
Router.route('/projects');
Router.route('/resume');

if (Meteor.isClient) {
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
