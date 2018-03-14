const wrapper = require('./utils/wrapSenecaAction');

const user = require('./services/user');

const _actions = [
    {
        action: { role: 'user', cmd: 'userGet' },
        cb: user.get
    }
];

module.exports = function actions(options) {

    _actions.forEach(action => wrapper(this, action));

    this.add({ role: 'user', cmd: 'userIdPost' }, user.postById);
    this.add({ role: 'user', cmd: 'userIdGet' }, user.getById);
};
