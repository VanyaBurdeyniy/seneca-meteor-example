const nconf = require('nconf');
const { join } = require('path');

nconf.argv()
    .env()
    .defaults({
        server: {
            port: 3000,
            access: {
                origin: '*',
                methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                headers: 'Origin, X-Requested-With, Content-Type, Accept',
            },
        },
    })
    .file({
        file: join(__dirname, 'config.json'),
    });

module.exports = nconf;
