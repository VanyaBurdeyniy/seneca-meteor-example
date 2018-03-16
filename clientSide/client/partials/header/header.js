import { Template } from 'meteor/templating';

Template.header.events({
  'click .info-link'(event, instance) {
    FlowRouter.go('/info');
  },
  'click .home-link'(event, instance) {
    FlowRouter.go('/');
  },
});