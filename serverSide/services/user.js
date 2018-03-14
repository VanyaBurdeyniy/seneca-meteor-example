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
 * @param {Callback} h - optional parameter for adding some additional info
 * @return {Object} - response
 * @throws {Error|Boom}
 */
exports.getAll = (data, h) => {
    console.log(data)

    h.setHeaders({
        'content-type': 'application/json',
        'asdf': 'asfsad'
    });

    return { success: true, users };
}


/**
 * Get data by userId
 * @param {Callback} h - optional parameter for adding some additional info
 * @return {Object} - response
 * @throws {Error|Boom}
 */
exports.getById = (data, h) => {
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
 * @param {Callback} h - optional parameter for adding some additional info
 * @return {Object} - response
 * @throws {Error|Boom}
 */
exports.postById = (data, h) => {
    const { params: { userId: _userId }, body } = data;

    console.log(body)
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
