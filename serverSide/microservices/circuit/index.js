const seneca = require('seneca')();
const endpoints = require('./endpoints');
const ROLE = 'circuit';

seneca
    .use('./wrapper', {
        role: ROLE,
        endpoints,
    })
    .listen({ type: 'tcp', port: 10203, pin: `role:${ROLE}` });
