/*
 COPYRIGHT 2017, 2018 SPIRENT COMMUNICATIONS OF ROCKVILLE, INC.
 UNPUBLISHED - ALL RIGHTS RESERVED
*/
/**
 * @module Server
 */

const express = require('express');
const bodyParser = require('body-parser');
const seneca = require('seneca');
const senecaWeb = require('seneca-web');
const logger = require('seneca-legacy-logger');
const adapter = require('seneca-web-adapter-express');

const routes = require('./routes/routes');

/**
 * Server
 */
class Server {
    /**
     * Creates Server instance
     * @param {config} config - put there specified config file
     */
    constructor (config) {
        this.config = config;

        this.context = express();
        this.context.use(bodyParser.json());

        /**
         * @constant routes
         * @type {Array} contain an each route logic for seneca-web
         */
        this.senecaWebConfig = {
            routes,
            adapter,
            context: this.context,
            options: { parseBody: false },
        };

        this.port = config.get('server:port');
    }

    /**
     * Configure new server
     * @returns {Promise} When server created
     */
    async configure () {
        await new Promise ((resolve) => {
            this._seneca = seneca({ internal: { logger } })
                .use(senecaWeb, this.senecaWebConfig)
                .use('./actions.js')
                .ready(() => {
                    const server = this._seneca.export('web/context')();

                    server.listen(this.port, () => {
                        global.log.info(`Server listening on port ${this.port}`);
                        resolve(this);
                    });
                });
        });
        
    }
}

module.exports = Server;



