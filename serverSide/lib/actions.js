/**
 * @fileOverview The main file of actions. It aggregates all actions togather with
 * different roles, wraps them and create seneca actions.
 * @module actions
 * @version 1.0.0
 * @license 
 * COPYRIGHT 2017, 2018 SPIRENT COMMUNICATIONS OF 
 * ROCKVILLE, INC. UNPUBLISHED - ALL RIGHTS RESERVED
 */
const wrapper = require('./utils/wrapActions');

const user = require('./actions/user');

/**
 * @typedef Action
 * @desc The key of Object must be the role name
 * @type {Object}
 * @property {Array} actionHandlers - There are {@link ActionHandler}s for making
 * a call of seneca-web routes
 */

/**
  * @typedef ActionHandler
  * @type {Object}
  * @property {String} action - The name of action from seneca-web routing
  * @property {Function} h - The handler function from {@link actions} 
  */

/**
 * @typedef _actionsAggregator
 * @type {Object}
 * @desc Contains an each action including an action type and handler
 * @property {Action} actionsByRole {@link Action}s which are owned by roles
 */

/**
 * @constant _actions
 * @type {_actionsAggregator} 
 * @private
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
 * @desc Handle all actions
 * @param {Object} [options] - Options which are received from middleware
 * @returns {void}
 */
module.exports = function actions() {
    // Leave options for now

    wrapper(this, _actions);
};
