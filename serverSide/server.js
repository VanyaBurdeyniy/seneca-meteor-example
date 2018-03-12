/*
 COPYRIGHT 2017, 2018 SPIRENT COMMUNICATIONS OF ROCKVILLE, INC.
 UNPUBLISHED - ALL RIGHTS RESERVED
 
*/
'use strict';

const senecaWeb = require('seneca-web');
const Express = require('express');
const Router = Express.Router;
const context = new Router();

const senecaWebConfig = {
    context,
    adapter: require('seneca-web-adapter-express'),
    options: {parseBody: false}
};

const app = Express();
app.use(require('body-parser').json());
app.use(context);
app.listen(8080, () => {
    console.log("Server listening on port 3000");
});


const seneca = require('seneca')()
    .use(senecaWeb, senecaWebConfig)
    .use('./actions');

seneca.act({role:'inventory', cmd:'find_item', id:'a3e42'}, (err, item) => {
    if (err) return err;    
    console.log(item);
});