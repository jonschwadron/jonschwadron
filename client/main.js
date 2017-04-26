import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import '../imports/api/typed.js';

// document.addEventListener('DOMContentLoaded', function(){
// 	Typed.new('.element', {
// 	  strings: ["First sentence.", "Second sentence."],
// 	  typeSpeed: 0
// 	});
// });

$(function(){
		$(".element").typed({
			strings: ["Did you ever hear the tragedy of Darth Plagueis the Wise?^1400<br><br>No?^1000 I thought not.^1250 It's not a story the Jedi would tell you.^1400<br><br>It's a Sith legend.^1250 Darth Plagueis^500 was a Dark Lord of the Sith^750 so powerful and so wise,^750 he could use the Force to influence the midi-chlorians^1000<br><br>^to create^1400 life.^1500<br><br>He had such a knowledge of the Dark Side,^750 he could even keep the ones he cared about^1000 from dying.^2000 He became so powerful,^1000 the only thing he was afraid of was^250 losing his power^250 which, eventually of course,^250 he did.^1500 Unfortunately,^1000 he taught his apprentice^300 everything he knew.^1250 Then his apprentice killed him in his sleep.^2000<br><br>Ironic.^1250<br><br>He could save others from death...^1500 but not himself."],
			typeSpeed: 10
		});


	});

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
