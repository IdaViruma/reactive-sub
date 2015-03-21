People = new Mongo.Collection("people");

if (Meteor.isClient) {
  Session.setDefault('age', 18);

  Template.people.helpers({
    persons: function () {
      return People.find();
    },
    ageVar: function () {
      return Session.get('age');
    }
  });

  Template.people.events({
    'click button': function () {
      // set the 'age' var to 18 or 21 on each click.
      var newAge = (Session.get('age') === 18) ? 21 : 18;
      Session.set("age", newAge);
    }
  });

  Template.people.onCreated(function () {
    // OPTION #1: Non-reactive!!!
    // this.subscribe("people", Session.get('age'));

    // OPTION #2: Reactively re-subscribe depending on 'age' var.
    // see docs: https://docs.meteor.com/#/full/Blaze-TemplateInstance-subscribe
    var self = this;
    self.autorun(function () {
      self.subscribe("people", Session.get('age'));
    });
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // Inserting some "fixtures" (i.e. testing data)
    if (People.find().count() === 0) {
      var folks = [{name: "Ada", age:18}, {name:"Grace", age:21}];
      _.each(folks, function (person) {
        People.insert(person);
      });
    }
  });

  Meteor.publish("people", function (age) {
    return People.find({age: age});
  });

}
