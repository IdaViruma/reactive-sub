# reactive-sub
Just a simple app (built with Meteor-JS) to test if the new [template.subscribe()](https://docs.meteor.com/#/full/Blaze-TemplateInstance-subscribe) method re-subscribes reactively.

##Description:

  We are subscribing to the list of People (who have "name" and "age" properties)
  and we use the button to change the "age" via Session variable.

##EXPECTED:

  the instansce-method **this.subscribe('people', Session.get('age'))** for the *Template.people* should:
  1. re-run upon the change of "age" and re-subscribe to the "people" publication;
  2. only show People who have "age" equal to the one set via Session.set('age', x).

##Solution:
  So, in order to make **"template.subscribe()"** reactively re-subscribe we need to put it inside another template-instance-method called **template.autorun()**
  <a href="https://docs.meteor.com/#/full/Blaze-TemplateInstance-subscribe">
     like suggested by docs </a>
