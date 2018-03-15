const winston = require('winston');
const config = require('../../config');


const logPath = config.get('log:path');

const { dirname } = require('path');
const { existsSync, mkdirSync } = require('fs');

if (!existsSync(dirname(logPath))) {
    // Create the directory if it does not exist
    mkdirSync(dirname(logPath));
}

const logger = winston.createLogger({
    transports: [

        new winston.transports.Console({
            timestamp: true,
            colorize: true,
            level: 'error',
        }),

        new winston.transports.File({
            filename: logPath,
            level: 'debug',
        }),
    ],
});

module.exports = logger;
