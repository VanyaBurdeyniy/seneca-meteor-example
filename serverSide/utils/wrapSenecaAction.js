const boom = require('boom');
const log = require('../lib/log');

module.exports = (self, { action, cb }) => {
    self.add(action, (msg, callback) => {
        wrapCallback(cb, {
            ...msg.args,
            boom,
        }, msg.response$)
            .then(callback, callback);
    });
}

class Handler {
    constructor(response) {
        this.response = response;
    }

    setHeaders(headers) {
        if (!headers || typeof headers !== 'object' || Array.isArray(headers)) {
            throw new Error('Headers must be an object type');
        }

        Object.keys(headers)
            .forEach(header => this.response.set(header, headers[header].toString()));

        return this;
    }

    statusCode(code) {
        this.response.status(code);
        return this;
    }
}

/**
 * The wrapper function for user's callback
 * @param {Function} userFunc  - the callback for user
 * @param {Object} args - related arguments 
 * @param {Response} response$ - response object from express
 * @returns {Primise.<Object>}
 */
async function wrapCallback(userFunc, args, response$) {
    try {
        const data = await userFunc(args, new Handler(response$));
        return data;
    } catch (error) {
        if (boom.isBoom(error)) {
            response$.status(error.output.statusCode);
            return error.output.payload;
        }

        // log.info(error.mesage);
        response$.status(500);
        return {
            "statusCode": 500,
            "error": "Internal Server Error",
            "message": error.message
        }
    }
}
