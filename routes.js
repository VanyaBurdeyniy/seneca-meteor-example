'use strict';

var inventory = require('./services/inventory');

module.exports = function routes(options) {
    console.log("Rule engine API called");

    this.add({role:'inventory', cmd:'find_item'}, inventory.add);
}
