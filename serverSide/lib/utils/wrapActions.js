/**
 * @fileOverview Wrapper for seneca actions
 * @module utils/wrapActions
 */
/// <reference path="../actions.js" />

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
 * @typedef Response 
 * @type {Object}
 * @desc Response object from express
 * @method status 
 * @method set - set one header
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
     * @type {Response}
     * @desc Holds response object
     * @private 
     * @see Response
     */

    /**
     * @param {Response} response - Response object from express
     */
    constructor(response) {
        this._response = response;
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

        Object.keys(headers)
            .forEach((header) => {
                this._response
                    .set(header, headers[header].toString());
            });

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
            throw new Error('statusCode must be a number type');
        }

        this._response.status(statusCode);
        return this;
    }
}

/**
 * @desc The wrapper function for user's callback
 * @param {Function} userFunc  - the callback for user
 * @param {Object} args - related arguments 
 * @param {Response} response$ - response object from express
 * @returns {Primise.<Object>} - the object for response.json
 */
async function wrapCallback(userFunc, args, response$) {
    try {
        const data = await userFunc(args, new HandleResponse(response$));
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

/**
 * @desc Wrapper per each action:
 * <br>- gets a role, command and actionHandler
 * <br>- creates seneca action with the above role and command
 * <br>- wraps actionHandler in purpose to use ES6 and some ES7 standards
 * @param {SenecaObject} senecaInstance  The refference to the seneca instance
 * @param {ActionObject} actions  {@link Actions} 
 * @return {void}
 */
module.exports = function (senecaInstance, actions) {
    Object.entries(actions)
        .forEach(([role, handlers]) => {
            handlers.forEach(({ action: cmd, h: actionHandler }) => {
                senecaInstance.add(
                    { role, cmd },
                    (
                        {
                            request$,
                            response$,
                            args,
                        },
                        callback
                    ) => {
                        wrapCallback(actionHandler, {
                            ...args,
                            headers: request$.headers,
                            boom,
                        }, response$)
                            .then(callback, callback);
                    });
            });
        });
};
