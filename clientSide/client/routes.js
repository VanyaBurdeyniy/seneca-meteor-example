import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

FlowRouter.route( '/', {
    action: () => {
        BlazeLayout.render('MainTemplate', {main: "home" });
    },
    name: 'root'
});
  
FlowRouter.route( '/info', {
    action: () => {
        BlazeLayout.render('MainTemplate', {main: "info" });
    },
    name: 'info'
});

FlowRouter.route( '/user/:id', {
    action: () => {
        BlazeLayout.render('MainTemplate', {main: "user" });
    },
    name: 'user'
});
  