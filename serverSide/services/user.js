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
 * @param {Object} data - contains all data from request (including request as request$) 
 */
exports.get = (data, h) => {
    console.log(data)

    h.setHeaders({
        'content-type':'application/json',
        'asdf':'asfsad'
    });
    
    throw data.boom.badRequest('some message')
    return { success: true, users };
}


/**
 * Get data by userId
 * @param {Object} msg - contains all data from request (including request as request$) 
 * @param {Callback} respond - callback
 */
exports.getById = ({ args, response$ }, respond) => {
    const { params: { userId:_userId } } = args;
    const userId = Number.parseInt(_userId, 10);
    if (!userId || isNaN(userId)) {
        const error = boom.badRequest('UserId is invalid').output;
        response$.status(error.statusCode)
        return respond(error.payload);
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


/**
 * Create new user and add it ot the users (in-memory db)
 * @param {Object} msg - contains all data from request (including request as request$) 
 * @param {Callback} respond - callback
 */
exports.postById = ({ args }, respond) => {
    const { params: { userId:_userId }, body } = args;

    console.log(body)
    const userId = Number.parseInt(_userId, 10);
    if (!userId || isNaN(userId)) {
        return respond(boom.badRequest('UserId is invalid').output.payload,);
    }

    const user = users.find(({ id }) => id === userId);

    if (user) {
        return respond(boom.badRequest('User is already exist').output.payload);
    }

    // TODO: validate body

    users.push({...body, id: userId});

    return respond({
        success: true,
    });
};
