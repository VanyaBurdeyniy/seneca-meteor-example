// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by stylesheets-helper.js.
import { name as packageName } from "meteor/spirent:stylesheets-helper";

// Write your tests here!
// Here is an example.
Tinytest.add('stylesheets-helper - example', function (test) {
  test.equal(packageName, "stylesheets-helper");
});
