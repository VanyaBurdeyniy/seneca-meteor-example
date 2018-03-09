/*
 COPYRIGHT 2017, 2018 SPIRENT COMMUNICATIONS OF ROCKVILLE, INC.
 UNPUBLISHED - ALL RIGHTS RESERVED
 
*/
let senecaWeb = require('seneca-web');
let Express = require('express');
let Router = Express.Router;
let context = new Router();

let senecaWebConfig = {
    context: context,
    adapter: require('seneca-web-adapter-express'),
    options: { parseBody: false }
}

let app = Express();
app.use(require('body-parser').json());
app.use(context);
app.listen(8080, function () {
    console.log("Server listening on port 3000");
});


let seneca = require('seneca')()
    .use(senecaWeb, senecaWebConfig)
    .use('./actions');

seneca.act({role:'inventory', cmd:'find_item', id:'a3e42'}, (err, item) => {
    if (err) return err;    
    console.log(item);
});