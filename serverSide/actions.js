const wrapper = require('./utils/wrapSenecaAction');

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
    ],
};

/**
 * Handle all actions
 * @param {Object} [options] - some options from middleware
 * @returns {Object} done
 */
module.exports = function actions () {
    // Leave options for now

    wrapper(this, _actions);
};
