const boom = require('boom');

module.exports = (self, { action, cb }) => {
    self.add(action, (msg, callback) => {
        wrapCallback(cb, {
            ...msg.args,
            boom,
        }, msg.response$)
            .then(callback, callback);
    });
};

/**
 * The wrapper function for user's callback
 * @param {Function} userFunc  - the callback for user
 * @param {Object} args - related arguments 
 * @param {Response} response$ - response object from express
 * @returns {Primise.<Object>}
 */
async function wrapCallback(userFunc, args, response$) {
    try {
        const data = await userFunc(args);
        return data;
    } catch (error) {
        if (boom.isBoom(error)) {
            response$.status(error.output.statusCode);
            return error.output.payload;
        }

        response$.status(500);
        return {
            "statusCode": 500,
            "error": "Internal Server Error",
            "message": "An internal server error occurred"
        }
    }

}
