const inventory = require('./services/inventory');

module.exports = function actions(options) {
    this.add({role:'inventory', cmd:'find_item'}, inventory.add);
}
