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

const wrapSenecaAction = require('./utils/wrapSenecaAction');
const { routes, actions } = require('./endpoints');

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
            adapter,
            routes,
            context: this.context,
            options: { parseBody: false },
        };


        this.port = config.get('server:port');
    }

    /**
     * Runs new server
     * @returns {Promise} When server created
     */
    async run () {
        return await new Promise((resolve) => {
            const _seneca = seneca({ internal: { logger } })
                .use(senecaWeb, this.senecaWebConfig);

            _seneca
                .use(wrapSenecaAction.bind(_seneca), actions)
                .ready(() => {
                    const server = _seneca.export('web/context')();

                    server.listen(this.port, () => resolve(this));
                });
        });
    }
}

module.exports = Server;



