import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import './routes';

import './views/info/info.controller';

// import './main.html';
// import './views/info.html';

// Template.hello.events({
//   'click button'(event, instance) {
//     // increment the counter when button is clicked
//     instance.counter.set(instance.counter.get() + 1);
//   },
// });

// FlowRouter.route( '/', {
//   action: function() {
//     BlazeLayout.render('MainTemplate', {main: "home" });
//   },
//   name: 'termsOfService'
// });

// FlowRouter.route( '/terms', {
//   action: function() {
//     BlazeLayout.render('MainTemplate', {main: "terms" });
//   },
//   name: 'termsOfService'
// });

// FlowRouter.route( '/info', {
//   action: function() {
//     BlazeLayout.render('MainTemplate', {main: "info" });
//   },
//   name: 'termsOfService'
// });
