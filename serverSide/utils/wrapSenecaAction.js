const boom = require('boom');

/**
 * @typedef RequestObject 
 * @type {Object} data - Contain all data from response
 * @property  {Object} headers - request headers
 * @property  {Object} body - request body
 * @property  {Object} query - request query
 * @property  {Object} params - request params
 */


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
};

/**
 * @typedef Response - response object from express
 * @type {Object}
 * @method status - set status code
 * @method set - set one header
 */

/**
  * @typedef Handler - an instance of Handler class
  * @type {Object}
  * @method setHeaders - set headers to response
  * @method setStatusCode  - set statusCode to response
  */

/**
 * Handle some optional functionality
 */
class Handler {
    /**
     * Create a new instance of Handler
     * @param {Response} response - response object from express
     */
    constructor (response) {
        this.response = response;
    }

    /** 
     * Set additional headers to response
     * @param {Object} headers - header object wchich contain header for response
     * @returns {Handler} - the reference
     */
    setHeaders (headers) {
        if (!headers || typeof headers !== 'object' || Array.isArray(headers)) {
            throw new Error('Headers must be an object type');
        }

        Object.keys(headers)
            .forEach((header) => {
                this.response
                    .set(header, headers[header].toString());
            });

        return this;
    }

    /**
     * Set the status code to response
     * @param {Number} statusCode - http status code
     * @returns {Handler} - the reference
     */
    setStatusCode (statusCode) {
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
 * @returns {Primise.<Object>} - the object for response.json
 */
async function wrapCallback (userFunc, args, response$) {
    try {
        const data = await userFunc(args, new Handler(response$));
        return data;
    } catch (error) {
        if (boom.isBoom(error)) {
            response$.status(error.output.statusCode);
            return error.output.payload;
        }

        const statusCode = error.statusCode || 500;
        response$.status(statusCode);
        return {
            statusCode: 500,
            error: 'Internal Server Error',
            message: error.message,
        };
    }
}
