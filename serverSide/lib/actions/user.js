/**
 * @fileOverview All actions which relys on role 'user'
 * @module actions/user
 */
/// <reference path="../utils/wrapActions.js" />

const boom = require('boom');
const statistic = require('./statistic');

/**
 * @constant users
 * @desc In-memory user storage
 * @private
 */
const users = [
    {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        age: 23,
        login: 'john',
        email: 'test@mail.com',
    },
    {
        id: 2,
        firstName: 'Evan',
        lastName: 'Broom',
        age: 18,
        login: 'Viliam',
        email: 'test2@mail.com',
    },
];


/**
 * @desc Get all users from the db (in-memory)
 * @param {RequestObject} data - Contain all data from response
 * @param {HandleResponse} [h] - optional parameter for adding some additional info
 * @return {Object} - response
 * @throws {Error|Boom}
 */
exports.getAll = (data, h) => {
    statistic.set('Get users', true);

    return { success: true, users };
};


/**
 * @desc Get user info by userId
 * @param {RequestObject} data - Contain all data from response
 * @param {HandleResponse} [h] - optional parameter for adding some additional info
 * @return {Object} - response
 * @throws {Error|Boom}
 */
exports.getById = data => {
    const { params: { userId: _userId } } = data;
    const userId = Number.parseInt(_userId, 10);
    if (!userId || isNaN(userId)) {
        statistic.set(`Get user by Id (${userId})`, false);
        throw boom.badRequest('UserId is invalid');
    }

    const user = users.find(({ id }) => id === userId);

    if (!user) {
        statistic.set(`Get user by Id (${userId})`, false);
        throw boom.badRequest('User with userId was not found');
    }

    statistic.set(`Get user by Id (${userId})`, true);
    return {
        user,
        success: true,
    };
};


/**
 * @desc Create a new user and add it to the users (in-memory db)
 * @param {RequestObject} data - Contain all data from response
 * @param {HandleResponse} [h] - optional parameter for adding some additional info
 * @return {Object} - response
 * @throws {Error|Boom}
 */
exports.create = data => {
    const { params: { userId: _userId }, body } = data;

    const userId = Number.parseInt(_userId, 10);
    if (!userId || isNaN(userId)) {
        statistic.set(`Create user by Id (${userId})`, false);
        throw boom.badRequest('UserId is invalid');
    }

    const user = users.find(({ id }) => id === userId);

    if (user) {
        statistic.set(`Create user by Id (${userId})`, false);
        throw boom.badRequest('User is already exist');
    }

    // TODO: validate body

    users.push({ ...body, id: userId });

    statistic.set(`Create user by Id (${userId})`, true);
    return {
        success: true,
    };
};

exports.delete = data => {
    const { params: { userId: _userId } } = data;

    const userId = Number.parseInt(_userId, 10);
    if (!userId || isNaN(userId)) {
        statistic.set(`Delete user by Id (${userId})`, false);
        throw boom.badRequest('UserId is invalid');
    }

    let index = null;
    const user = users.find(({ id }, _index) => {
        index = _index;
        return id === userId;
    });

    if (!user) {
        statistic.set(`Delete user by Id (${userId})`, false);
        throw boom.badRequest('User with userId was not found');
    }

    users.splice(index, 1);

    statistic.set(`Delete user by Id (${userId})`, true);
    return {
        success: true,
    }

};
