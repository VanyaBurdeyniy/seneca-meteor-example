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

context.use(bodyParser.json());

const routes = [
    {
        prefix: '/user',
        pin: 'role:user,cmd:*',
        map: {
            getAll: {
                GET: true,
                name: ''
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
            }
        },
    },
    {
        prefix: '/admin',
        pin: 'role:admin,cmd:*',
        map: {
            login: {
                POST: true,
                name: ''
            },
        },
    },
];

const senecaWebConfig = {
    context,
    routes,
    adapter,
    options: { parseBody: false }
};

const _seneca = seneca({ internal: { logger } })
    .use(senecaWeb, senecaWebConfig)
    .use('actions')
    .ready(() => {
        const server = _seneca.export('web/context')();

        server.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    });
