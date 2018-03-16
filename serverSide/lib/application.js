/**
 * @fileOverview The entry point of the application.
 * @module server
 */

const express = require('express');
const bodyParser = require('body-parser');
const seneca = require('seneca');
const senecaWeb = require('seneca-web');
const logger = require('seneca-legacy-logger');
const adapter = require('seneca-web-adapter-express');

const wrapActions = require('./utils/wrapActions');
const { routes, actions } = require('./endpoints');

/**
 * @classDesc The main enter point of application 
 * express response object
 * @class
 */
class Application {
    /**
     * @param {Object} config - put there specified config file
     * @param {Function} config.get Get parameter from configurations
     */
    constructor(config) {
        this._config = config;

        /**
         * @const context
         * @type {ExpressInstance}
         * @private
         */
        const context = express();
        context.use(bodyParser.json());

        /**
         * @const senecaWebConfig
         * @type {Object}
         * @desc Options for configurating seneca-web module
         * @property {Express} context - The expless or express.Route instance
         * @property {Array} routes - Configured {@link routes}
         * @property {Function} adapter - Module seneca-web-adapter-express - which 
         * provides some additional configurations for express (context)
         * @property {Object} [options] - Additional options
         * @property {Boolean} [options.parseBody=true] - Whether parse body on not
         */
        this._senecaWebConfig = {
            adapter,
            routes,
            context,
            options: { parseBody: false },
        };


        this.port = config.get('server:port');
    }

    /**
     * Runs new server
     * @returns {Promise} When server created
     */
    async run() {
        /**
         * @constant _seneca
         * @type {Object}
         * @desc The instance of seneca module which provide all seneca sollutions 
         * for use
         * @property {Function} use - Allows to add plugins
         * @property {Function} ready - Allows to run provided function for run it 
         * after all plugins were added
         */
        return await new Promise((resolve) => {
            const _seneca = seneca({ internal: { logger } })
                .use(senecaWeb, this._senecaWebConfig);

            _seneca
                .use(wrapActions.bind(_seneca), actions)
                .ready(() => {
                    const server = _seneca.export('web/context')();

                    server.listen(this.port, () => resolve(this));
                });
        });
    }
}


module.exports = Application;