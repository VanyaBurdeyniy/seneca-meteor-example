/*
 COPYRIGHT 2017, 2018 SPIRENT COMMUNICATIONS OF ROCKVILLE, INC.
 UNPUBLISHED - ALL RIGHTS RESERVED
*/

const context = require('express')();
const bodyParser = require('body-parser');
const seneca = require('seneca');
const senecaWeb = require('seneca-web');
const logger = require('seneca-legacy-logger');
const adapter = require('seneca-web-adapter-express');

const config = require('./config');
const PORT = config.get('PORT');

const routes = [
    {
        prefix: '/',
        pin: 'role:user,cmd:*',
        map: {
            userGet: {
                GET: true,
                alias: '/user',
            },
            userIdGet: {
                GET: true,
                alias: '/user/:userId',
            },
        },
    },
];

const senecaWebConfig = {
    context,
    routes,
    adapter,
};

const _seneca = seneca({ internal: { logger } })
    .use(senecaWeb, senecaWebConfig)
    .use('actions')
    .ready(() => {
        const server = _seneca.export('web/context')();

        server.use(bodyParser.json());

        server.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    });
