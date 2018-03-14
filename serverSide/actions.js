const wrapper = require('./utils/wrapSenecaAction');

const inventory = require('./services/inventory');
const user = require('./services/user');

const _actions = {
    user: [
        {
            action: 'getAll',
            h: user.getAll,
        },
        {
            action: 'getById',
            h: user.get,
        },
        {
            action: 'create',
            h: user.create,
        },
    ],
    admin: [
        {
            action: 'login',
            h: (a, r) => r({}),
        },
    ]
};

module.exports = function actions(options) {
    // Leave options for now

    wrapper(this, _actions);
};
