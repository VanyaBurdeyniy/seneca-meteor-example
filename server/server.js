/*
 COPYRIGHT 2017, 2018 SPIRENT COMMUNICATIONS OF ROCKVILLE, INC.
 UNPUBLISHED - ALL RIGHTS RESERVED
 
*/
var senecaWeb = require('seneca-web');
var Express = require('express');
var Router = Express.Router;
var context = new Router();
// var logger = require('../utils/logger');

var senecaWebConfig = {
    context: context,
    adapter: require('seneca-web-adapter-express'),
    options: { parseBody: false }
}

var app = Express();
app.use(require('body-parser').json());
app.use(context);
app.use(Express.static(__dirname + '/public'));
app.listen(8080, function () {
    console.log("Web server started on port 3000");
});


var seneca = require('seneca')()
    .use(senecaWeb, senecaWebConfig)
    .use('./routes');

    seneca.act({role:'inventory', cmd:'find_item', id:'a3e42'}, function(err, item) {
        if (err) return err;
      
        console.log(item);
      });