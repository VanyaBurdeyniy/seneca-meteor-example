'use strict';

const Winston = require('winston');

const logger = () => {
    const transports = [

        new Winston.transports.Console({
            timestamp: true,
            colorize: true,
            level: 'error',
        }),

        new Winston.transports.File({
            filename: global.config.get('log:path'),
            level: 'debug',
        }),

    ];

    return new Winston.Logger({
        transports,
    });
};

module.exports = module => logger(module.filename);
