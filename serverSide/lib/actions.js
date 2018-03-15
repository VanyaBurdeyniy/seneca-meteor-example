/**
 * @module utils
 */
const wrapper = require('./utils/wrapSenecaAction');

const user = require('./actions/user');

/**
 * @constant actions
 * @type {Object} Contain an each action with an action type and handler
 * @param {Object} actionName : {Array}
 */
const _actions = {
    user: [
        {
            action: 'getAll',
            h: user.getAll,
        },
        {
            action: 'getById',
            h: user.getById,
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
 * @param {Object} [options] - Options which are received from middleware
 * @param {Function} [done] - Callback function
 * @returns {Object} Return the result of <strong>done(error [, data])</strong>
 */
module.exports = function actions () {
    // Leave options for now

    wrapper(this, _actions);
};
