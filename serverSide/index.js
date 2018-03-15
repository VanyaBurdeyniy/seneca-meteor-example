const config = require('./config');
const Server = require('./lib/server');

global.log = require('./lib/services/log')(config.get('log:path'));

const server = new Server(config);

server.configure();
