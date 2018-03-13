const boom = require('boom');

class User {
    static mainService ({ method }, respond) {
        switch (method) {
        case 'GET':
            return respond(null, { success: true });
        case 'POST':
            return respond(boom.badRequest('Parameters are invorect'));
        default:
            return respond(
                boom.methodNotAllowed(`The method ${method} is not allowed`)
            );
        }
    }

    static idService (args, respond) {
        return respond(null, { success: true });
    }

    static actionService (args, respond) {
        return respond(null, { success: true });
    }

    static parameterService (args, respond) {
        return respond(null, { success: true });
    }
}

// User factory
module.exports = (args, respond) => {
    const { payloads: { params } } = args;

    if (params.parameter) {
        return User.parameterService(args.payloads, respond);
    }

    if (params.action) {
        return User.actionService(args.payloads, respond);
    }

    if (params.userId) {
        return User.idService(args.payloads, respond);
    }

    return User.mainService(args.payloads, respond);
};
