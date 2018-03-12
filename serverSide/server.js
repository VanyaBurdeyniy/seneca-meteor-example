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


const seneca = require('seneca')()
    .use(senecaWeb, senecaWebConfig)
    .use('./actions');

seneca.act({
    role: 'inventory',
    cmd: 'find_item',
    id: 'a3e42',
}, (err, item) => {
    if (err) {
        return err;
    }
    console.log(item);
});
