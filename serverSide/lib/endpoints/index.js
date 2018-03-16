const user = require('../actions/user');

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
        },
    },
    {
        prefix: '/admin',
        pin: 'role:admin,cmd:*',
        map: {
            login: {
                POST: true,
                name: '',
            },
        },
    },
];

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
    ],
    admin: [
        {
            action: 'login',
            h: (a, r) => r({}),
        },
    ],
}