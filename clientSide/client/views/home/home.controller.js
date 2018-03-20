import { HTTP } from 'meteor/http';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

Template.home.onCreated(function() {
    let self = this;
    self.users = new ReactiveVar(null);

    HTTP.call('GET', 'http://localhost:3000/user', {}, (error, result) => {
        if (!error) {
            self.users.set(result.data.users);
        } else {
            console.log(error);
        }
    });
});

Template.home.helpers({
    users: function() {
        return Template.instance().users.get();
    }
});

Template.home.events({
    'click .go-to-user'(event, instance) {
        FlowRouter.go('/user/' + this.id);
    }
});