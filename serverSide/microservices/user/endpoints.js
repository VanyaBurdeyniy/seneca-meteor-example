const User = require('./handlers/user'); 

const user = new User();

module.exports = [
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
];
