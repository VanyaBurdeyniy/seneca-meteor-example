const config = require('./config');
const Application = require('./lib/application');

global.log = require('./lib/services/log')(config.get('log:path'));

const application = new Application(config);

application.run()
    .then(application => log.info(`Server listening on port ${application.port}`))
    .catch((message) => log.error(message));

process.on('uncaughtException', (message) => log.error(message));