const nconf = require('nconf');
const { join } = require('path');

nconf.argv()
    .env()
    .defaults({
        PORT: 3000,
    })
    .file({
        file: join(__dirname, 'config.json'),
    });

module.exports = nconf;