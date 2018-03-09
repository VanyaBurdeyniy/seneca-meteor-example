import { Template } from 'meteor/templating';
import { HTTP } from 'meteor/http';

Template.info.events({
  'click button'(event, instance) {
    console.log('clicked event');
  },
});