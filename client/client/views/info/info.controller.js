import { Template } from 'meteor/templating';

Template.info.events({
  'click button'(event, instance) {
    console.log('clicked event');
  },
});