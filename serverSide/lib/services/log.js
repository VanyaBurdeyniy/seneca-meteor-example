const winston = require('winston');

const logger = (logPath) => {
    const { dirname } = require('path');
    const { existsSync, mkdirSync } = require('fs');

    if (!existsSync(dirname(logPath))) {
        // Create the directory if it does not exist
        mkdirSync(dirname(logPath));
    };

    return winston.createLogger({
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
};

module.exports = logger;
