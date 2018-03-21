/**
 * @fileOverview The entry point of the application.
 * @module server
 */

const express = require('express');
const bodyParser = require('body-parser');
const seneca = require('seneca');
const senecaWeb = require('seneca-web');
const logger = require('seneca-legacy-logger');
const adapter = require('./adapter');

const routes = require('./endpoints');

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
         * @property {Function} adapter - Custom adapter for aggregating request data and 
         * transform data from action to response
         * @property {Object} [options] - Additional options
         * @property {Boolean} [options.parseBody=true] - Whether parse body on not
         */
        this._senecaWebConfig = {
            adapter,
            routes,
            context,
            options: { parseBody: false },
        };

        this._port = config.get('server:port');

        /**
         * @prop _seneca
         * @type {Object}
         * @desc The instance of seneca module which provide all seneca sollutions 
         * for use
         * @property {Function} use - Allows to add plugins
         * @property {Function} ready - Allows to run provided function for run it 
         * after all plugins were added
         */
        this._seneca = seneca({ internal: { logger } })
            .use(senecaWeb, this._senecaWebConfig);
    }

    /**
     * Runs new application instance
     * @returns {Promise} When server created
     */
    run() {
        return new Promise((resolve) => {
            this._seneca
                .ready(() => {
                    this._seneca
                        .export('web/context')()
                        .listen(this._port, () => resolve(this));
                });
        });
    }

    /**
     * @desc Add some microservice to an application
     * @param {Object|String} options Options for seneca instance 
     * @returns {Application} Refference to the instance of the Application
     */
    addMicroservice(options) {
        this._seneca.client(options);
        return this;
    }

    /**
     * @desc Get port from the application
     * @returns {Number|String} Port which the application listen to
     */
    getPort() {
        return this._port;
    }
}


module.exports = Application;
