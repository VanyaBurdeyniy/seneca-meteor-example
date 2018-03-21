const seneca = require('seneca')();
const endpoints = require('./endpoints');
const ROLE = 'user';

seneca
    .use('./wrapper', {
        role: ROLE,
        endpoints,
    })
    .listen({ type: 'tcp', port: 10202, pin: `role:${ROLE}` });
