/**
 * @fileOverview Wrapper for seneca actions
 * @module utils/wrapActions
 */

const boom = require('boom');

/**
 * @typedef RequestObject 
 * @type {Object} 
 * @desc Contain all data from response
 * @property  {Object} headers - request headers
 * @property  {Object} body - request body
 * @property  {Object} query - request query
 * @property  {Object} params - request params
 *
 * @typedef HandleResponse
 * @type {Object}
 * @desc An instance of Handler class
 * @method setHeaders
 * @method setStatusCode
 * 
 * @typedef SenecaObject
 * @type {Object}
 * @desc A refference to seneca instance
 * @method add
 * @method act
 */

/**
 * @classDesc Handle some optional functionality. It is a wrapper for the 
 * express response object
 * @class
 */
class HandleResponse {
    /** 
     * @type {Object}
     * @desc Holds response object
     * @private 
     * @see Response
     */

    /**
     * @desc constructor
     */
    constructor() {
        this._response = {};
    }

    /** 
     * @desc Set additional headers to response
     * @public
     * @param {Object} headers - header object wchich contain header for response
     * @returns {HandleResponse} - the reference
     */
    setHeaders(headers) {
        if (!headers || typeof headers !== 'object' || Array.isArray(headers)) {
            throw new Error('Headers must be an object type');
        }

        this._response.headers = headers;

        return this;
    }

    /**
     * @desc Set the status code to response
     * @public
     * @param {Number} statusCode - http status code
     * @returns {HandleResponse} - the reference
     */
    setStatusCode(statusCode) {
        if (!statusCode || typeof statusCode !== 'number') {
            throw new Error('StatusCode must be a number type');
        }

        this._response.statusCode = statusCode;
        return this;
    }

    /**
     * @desc Set body to response
     * @param {Object} body Body fo response
     * @returns {HandleResponse} - the reference
     */
    setBody(body) {
        this._response.body = body;
        return this;
    }

    /**
     * @desc Get response
     * @returns {Object} response
     */
    getResponse() {
        return {
            statusCode: 200,
            headers: {},
            ...this._response,
        };
    }
}

/**
 * @desc The wrapper function for user's callback
 * @param {Function} userFunc  - the callback for user
 * @param {Object} args - related arguments 
 * @returns {Primise.<Object>} - the object for response.json
 */
async function wrapCallback(userFunc, args) {
    const responseHandler = new HandleResponse();
    try {
        const data = await userFunc(args, responseHandler);
        responseHandler
            .setStatusCode(200)
            .setBody(data);
        return responseHandler.getResponse();
    } catch (error) {
        // return boom result
        if (boom.isBoom(error)) {
            responseHandler
                .setStatusCode(error.output.statusCode)
                .setBody(error.output.payload);
            return responseHandler.getResponse();
        }

        // otherwise return error data
        responseHandler
            .setStatusCode(error.statusCode || 500)
            .setBody({
                statusCode: 500,
                error: 'Internal Server Error',
                message: error.message,
            });

        return responseHandler.getResponse();
    }
}

/**
 * @desc Wrapper per each action:
 * <br>- gets a role, command and actionHandler
 * <br>- creates seneca action with the above role and command
 * <br>- wraps actionHandler in purpose to use ES6 and some ES7 standards
 * @param {Object} options  Options
 * @param {String} options.role The specific role for seneca actions
 * @param {Array} options.endpoints The specific role for seneca actions
 * @return {void}
 */
module.exports = function ({ role, endpoints }) {
    endpoints.forEach(({ action: cmd, h: actionHandler }) => {
        this.add(
            { role, cmd },
            ({ args }, callback) => {
                wrapCallback(actionHandler, args)
                    .then(callback, callback);
            });
    });
};
