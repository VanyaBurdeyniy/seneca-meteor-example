/**
 * @fileOverview The entry point of the application.
 * @module server
 * @version 1.0.0
 * @license 
 * COPYRIGHT 2017, 2018 SPIRENT COMMUNICATIONS OF 
 * ROCKVILLE, INC. UNPUBLISHED - ALL RIGHTS RESERVED
 */

const context = require('express')();
const bodyParser = require('body-parser');
const seneca = require('seneca');
const senecaWeb = require('seneca-web');
const logger = require('seneca-legacy-logger');
const adapter = require('seneca-web-adapter-express');
const log = require('./services/log');

const config = require('../config');
const PORT = config.get('PORT');

/** middleware: Parse body */
context.use(bodyParser.json());

/**
 * @constant routes
 * @type {Array} 
 * @desc Contain an each route logic for seneca-web
 * @private
 */
const routes = [
    {
        prefix: '/user',
        pin: 'role:user,cmd:*',
        map: {
            getAll: {
                GET: true,
                name: '',
            },
            getById: {
                GET: true,
                name: '',
                suffix: '/:userId',
            },
            create: {
                POST: true,
                name: '',
                suffix: '/:userId',
            },
        },
    },
    {
        prefix: '/admin',
        pin: 'role:admin,cmd:*',
        map: {
            login: {
                POST: true,
                name: '',
            },
        },
    },
];

/**
 * @const senecaWebConfig
 * @type {Object}
 * @desc Options for configurating seneca-web module
 * @property {Express} context - The expless or express.Route instance
 * @property {Array} routes - Configured {@link routes}
 * @property {Function} adapter - Module seneca-web-adapter-express - which provides some 
 * additional configurations for express (context)
 * @property {Object} [options] - Additional options
 * @property {Boolean} [options.parseBody=true] - Whether parse body on not
 */
const senecaWebConfig = {
    context,
    routes,
    adapter,
    options: { parseBody: false },
};

/**
 * @constant _seneca
 * @type {Object}
 * @desc The instance of seneca module which provide all seneca sollutions for use
 * @property {Function} use - Allows to add plugins
 * @property {Function} ready - Allows to run provided function for run it after all plugins were added
 */
const _seneca = seneca({ internal: { logger } })
    .use(senecaWeb, senecaWebConfig)
    .use('actions.js')
    .ready(() => {
        const server = _seneca.export('web/context')();

        server.listen(PORT, () => {
            log.info(`Server listening on port ${PORT}`);
        });
    });
