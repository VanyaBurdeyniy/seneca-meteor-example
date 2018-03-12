/*
 COPYRIGHT 2017, 2018 SPIRENT COMMUNICATIONS OF ROCKVILLE, INC.
 UNPUBLISHED - ALL RIGHTS RESERVED
*/

const senecaWeb = require('seneca-web');
const express = require('express');
const bodyParser = require('body-parser');
const { Router } = express;
const context = new Router();

const senecaWebConfig = {
    context,
    adapter: require('seneca-web-adapter-express'),
    options: { parseBody: false },
};

const app = express();
app.use(bodyParser.json());
app.use(context);
app.listen(8080, () => {
    console.log('Server listening on port 3000');
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
