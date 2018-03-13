const boom = require('boom');

// In-memoty user storage
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
 * @param {Object} msg - contains all data from request (including request as request$) 
 * @param {Callback} respond - callback
 */
exports.get = ({ args }, respond) => respond({ success: true, users });

/**
 * Get data by userId
 * @param {Object} msg - contains all data from request (including request as request$) 
 * @param {Callback} respond - callback
 */
exports.getById = ({ args }, respond) => {
    const { params: { userId:_userId } } = args;

    const userId = Number.parseInt(_userId, 10);
    if (!userId || isNaN(userId)) {
        return respond(boom.badRequest('UserId is invalid').output.payload);
    }

    const user = users.find(({ id }) => id === userId);

    if (!user) {
        return respond(boom.badRequest('User with userId was not found').output.payload);
    }

    return respond({
        user,
        success: true,
    });
};
