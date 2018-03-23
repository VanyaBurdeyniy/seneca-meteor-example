/**
 * @fileOverview The main file of endpoints. It aggregates all endpoints togather with
 * different roles, wraps them and create seneca endpoints.
 * @module endpoints
 */

module.exports = [
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
        prefix: '/circuit',
        pin: 'role:circuit,cmd:*',
        map: {
            getById: {
                GET: true,
                name: '',
                suffix: '/:circuitId',
            },
        },
    },
];
