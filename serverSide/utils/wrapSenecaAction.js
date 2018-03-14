const boom = require('boom');
const log = require('../lib/log');

module.exports = function (self, actions) {
    Object.entries(actions)
        .forEach(([role, handlers]) => {
            handlers.forEach(({ action: cmd, h }) => {
                self.add(
                    { role, cmd },
                    (
                        {
                            request$,
                            response$,
                            args,
                        },
                        callback
                    ) => {
                        wrapCallback(h, {
                            ...args,
                            headers: request$.headers,
                            boom,
                        }, response$)
                            .then(callback, callback);
                    });
            });
        });
}

/**
 * @class Handler - handle soem optional functionality
 */
class Handler {
    constructor(response) {
        this.response = response;
    }

    /** 
     * Set additional headers to response
     * @param {Object} headers 
     */
    setHeaders(headers) {
        if (!headers || typeof headers !== 'object' || Array.isArray(headers)) {
            throw new Error('Headers must be an object type');
        }

        Object.keys(headers)
            .forEach(header => this.response.set(header, headers[header].toString()));

        return this;
    }

    /**
     * Set the status code to response
     * @param {Number} statusCode - http status code
     */
    setStatusCode(statusCodecode) {
        if (!statusCode || typeof statusCode !== 'number') {
            throw new Error('statusCode must be a number type');
        }

        this.response.status(statusCode);
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
        const statusCode = error.statusCode || 500;
        response$.status(statusCode);
        return {
            "statusCode": 500,
            "error": "Internal Server Error",
            "message": error.message
        }
    }
}
