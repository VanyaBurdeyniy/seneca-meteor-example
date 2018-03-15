/// <reference path="../utils/wrapSenecaAction.js" />

const boom = require('boom');

// In-memory user storage
const users = [
    {
        id: 1,
        login: 'john',
        email: 'test@mail.com',
    },
    {
        id: 2,
        login: 'Viliam',
        email: 'test2@mail.com',
    },
];


/**
 * Get all users from the db (in-memory)
 * @param {RequestObject} data - Contain all data from response
 * @param {HandleResponse} [h] - optional parameter for adding some additional info
 * @return {Object} - response
 * @throws {Error|Boom}
 */
exports.getAll = (data, h) => {
    h.setHeaders({
        'content-type': 'application/json',
        asdf: 'asfsad',
    })

    return { success: true, users };
};


/**
 * Get data by userId
 * @param {RequestObject} data - Contain all data from response
 * @param {HandleResponse} [h] - optional parameter for adding some additional info
 * @return {Object} - response
 * @throws {Error|Boom}
 */
exports.getById = (data) => {
    const { params: { userId: _userId } } = data;
    const userId = Number.parseInt(_userId, 10);
    if (!userId || isNaN(userId)) {
        throw boom.badRequest('UserId is invalid');
    }

    const user = users.find(({ id }) => id === userId);

    if (!user) {
        throw boom.badRequest('User with userId was not found');
    }

    return {
        user,
        success: true,
    };
};


/**
 * Create new user and add it ot the users (in-memory db)
 * @param {RequestObject} data - Contain all data from response
 * @param {HandleResponse} [h] - optional parameter for adding some additional info
 * @return {Object} - response
 * @throws {Error|Boom}
 */
exports.postById = (data) => {
    const { params: { userId: _userId }, body } = data;

    const userId = Number.parseInt(_userId, 10);
    if (!userId || isNaN(userId)) {
        throw boom.badRequest('UserId is invalid');
    }

    const user = users.find(({ id }) => id === userId);

    if (user) {
        throw boom.badRequest('User is already exist');
    }

    // TODO: validate body

    users.push({ ...body, id: userId });

    return {
        success: true,
    };
};
