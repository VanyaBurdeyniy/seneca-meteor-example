const winston = require('winston');
const config = require('../config');

const logger = winston.createLogger({
    transports: [

        new winston.transports.Console({
            timestamp: true,
            colorize: true,
            level: 'error',
        }),

        new winston.transports.File({
            filename: config.get('log:path'),
            level: 'debug',
        }),
    ],
});

<<<<<<< HEAD
module.exports = logger;
=======
module.exports = logger;
>>>>>>> dev
