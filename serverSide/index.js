const config = require('./config');
const Application = require('./lib/application');

global.log = require('./lib/services/log')(config.get('log:path'));

const application = new Application(config);

application
    .addMicroservice({ type: 'tcp', port: 10202, pin: 'role:user,cmd:*' })
    .addMicroservice({ type: 'tcp', port: 10203, pin: 'role:circuit,cmd:*' })
    .run()
    .then(application => log.info(`Server listening on port ${application.getPort()}`))
    .catch(message => log.error(message));

process.on('uncaughtException', message => log.error(message));

module.exports = application;
