'use strict';

const Winston = require('winston');

const logger = function() {

    const transports = [

        new Winston.transports.Console({
            timestamp: true,
            colorize: true,
            level: 'error'
        }),

        new Winston.transports.File({
            filename: global.config.get('log:path'),
            level: 'debug'
        })

    ];

    return new Winston.Logger({
        transports
    });


};

module.exports = function(module) {
    return logger(module.filename);
};