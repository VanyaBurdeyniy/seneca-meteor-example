const inventory = require('./services/inventory');
const user = require('./services/user');

module.exports = function actions (options) {
    this.add({ role:'inventory', cmd:'find_item' }, inventory.add);
    this.add({ cmd:'user' }, user);
};
