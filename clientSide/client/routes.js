import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// import './main.html';
// import './views/home/home.template.html';
// import './views/info/info.template.html';

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
  