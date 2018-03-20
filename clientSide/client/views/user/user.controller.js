import { HTTP } from 'meteor/http';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.user.onCreated(function() {
    let self = this;
    self.user = new ReactiveVar(null);

    HTTP.call('GET', 'http://localhost:3000/user/' + FlowRouter.getParam('id'), {}, (error, result) => {
        if (!error) {
            self.user.set(result.data.user);
        } else {
            console.log(error);
        }
    });
});

Template.user.helpers({
    user: function() {
        return Template.instance().user.get();
    }
});