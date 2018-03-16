const nconf = require('nconf');
const { join } = require('path');

nconf.argv()
    .env()
    .defaults({
        server: {
            port: 3000,
        },
    })
    .file({
        file: join(__dirname, 'config.json'),
    });

module.exports = nconf;
