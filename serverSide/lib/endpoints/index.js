/**
 * @fileOverview The main file of endpoints. It aggregates all endpoints togather with
 * different roles, wraps them and create seneca endpoints.
 * @module endpoints
 * @version 1.0.0
 * @license
 * COPYRIGHT 2017, 2018 SPIRENT COMMUNICATIONS OF
 * ROCKVILLE, INC. UNPUBLISHED - ALL RIGHTS RESERVED
 */

const user = require('../actions/user');
const statistic = require('../actions/statistic');

exports.routes = [
    {
        prefix: '/user',
        pin: 'role:user,cmd:*',
        map: {
            getAll: {
                GET: true,
                name: '',
            },
            getById: {
                GET: true,
                name: '',
                suffix: '/:userId',
            },
            create: {
                POST: true,
                name: '',
                suffix: '/:userId',
            },
            delete: {
                DELETE: true,
                name: '',
                suffix: '/:userId',
            }
        },
    },
    {
        prefix: '/statistic',
        pin: 'role:stat,cmd:*',
        map: {
            get: {
                GET: true,
                name: '',
            },
        },
    },
];

/**
 * @typedef Action
 * @desc The key of Object must be the role name
 * @type {Object}
 * @property {Array} actionHandlers - There are {@link ActionHandlers} for making
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
 * @property {Action} actionsByRole {@link Actions} which are owned by roles
 */

/**
 * @constant _actions
 * @type {_actionsAggregator}
 * @private
 */
exports.actions = {
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
        {
            action: 'delete',
            h: user.delete,
        },
    ],
    stat: [
        {
            action: 'get',
            h: statistic.get,
        },
    ],
};
