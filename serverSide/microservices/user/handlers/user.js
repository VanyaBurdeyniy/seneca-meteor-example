/**
 * @fileOverview All actions which relies on a 'user' role
 * @namespace microservice
 * @module micro/user/handlers/user
 */

const boom = require('boom');

/**
 * @constant users
 * @desc In-memory user storage
 * @private
 */
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

module.exports = class User {
    /**
     * @desc Get all users from the db (in-memory)
     * @param {RequestObject} data - Contain all data from request
     * @param {HandleResponse} [h] - optional parameter for adding some additional info
     * @return {Object} - response
     * @throws {Error|Boom}
     */
    getAll(data, h) {
        h.setHeaders({
            'content-type': 'application/json',
            asdf: 'asfsad',
        });

        return { success: true, users };
    }

    /**
     * @desc Get user info by userId
     * @param {RequestObject} data - Contain all data from request
     * @param {HandleResponse} [h] - optional parameter for adding some additional info
     * @return {Object} - response
     * @throws {Error|Boom}
     */
    getById(data) {
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
    }

    /**
     * @desc Create a new user and add it to the users (in-memory db)
     * @param {RequestObject} data - Contain all data from request
     * @param {HandleResponse} [h] - optional parameter for adding some additional info
     * @return {Object} - response
     * @throws {Error|Boom}
     */
    create(data) {
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
};
