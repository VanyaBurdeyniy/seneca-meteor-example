/*
 COPYRIGHT 2017, 2018 SPIRENT COMMUNICATIONS OF ROCKVILLE, INC.
 UNPUBLISHED - ALL RIGHTS RESERVED
*/

const senecaWeb = require('seneca-web');
const express = require('express');
const bodyParser = require('body-parser');
const { Router } = express;
const context = new Router();

const config = require('./config');
const PORT = config.get('PORT');

const senecaWebConfig = {
    context,
    adapter: require('seneca-web-adapter-express'),
    options: { parseBody: false },
};

const app = express();
app.use(bodyParser.json());

app.use(context);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

// User router
context.all('/user(/:userId)?(/:action)?(/:parameter)?', (req, res) => {
    const {
        query,
        body,
        headers,
        path,
        params,
        method,
    } = req;

    const payloads = {
        query,
        body,
        headers,
        params,
        path,
        method,
    };

    // TODO: get a role from an auth module if there would be a need
    seneca.act({ cmd: 'user', payloads }, (error, data) => {
        if (error) {
            return res
                .status(error.output.statusCode)
                .json(error.output.payload);
        }

        return res.json(data);
    });
});

const seneca = require('seneca')()
    .use(senecaWeb, senecaWebConfig)
    .use('./actions');
