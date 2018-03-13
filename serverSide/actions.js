const inventory = require('./services/inventory');
const user = require('./services/user');

module.exports = function actions (options) {
    this.add({ role: 'user', cmd: 'userGet' }, user.get);
    this.add({ role: 'user', cmd: 'userIdGet' }, user.getById);
};
