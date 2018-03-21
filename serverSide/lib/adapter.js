/**
 * Adapter for seneca-web.
 * It retreave headers, method and other needed things from the request
 * and translate result from seneca actions to correct response.
 * @param {Object} options Some options from seneca-web
 * @param {Object} context An express intance
 * @param {Object} auth The authentication object
 * @param {Array} routes The array of routes
 * @param {Function} done Callback
 * @returns {Callback} done()
 */
module.exports = function adapter(options, context, auth, routes, done) {
    const seneca = this;

    // Check the context (express instance)
    if (!context) {
        return done(new Error('There is no context provided'));
    }

    const { middleware } = options;

    routes.forEach((route) => {
        route.methods.forEach((_method) => {
            // Create a middleware
            const routeMiddleware = (route.middleware || [])
                .map((_middleware) => {
                    const ret = typeof _middleware === 'string'
                        ? middleware[_middleware]
                        : _middleware;
                    if (typeof ret !== 'function') {
                        throw new Error(`Expected valid middleware, got ${_middleware}`);
                    }
                    return ret;
                });

            // Need to change method to lowercase depending on 
            // the options that all methods in express called in lowwercase
            const method = _method.toLowerCase();

            // concatenate route arguments for express route
            const routeArgs = [route.path]
                .concat(routeMiddleware)
                .concat([
                    (request, reply) => {
                        handleRoute(
                            seneca,
                            request,
                            reply,
                            route
                        );
                    },
                ]);

            // apply all arguments to express[method]
            /* eslint prefer-spread: 0 */
            context[method].apply(context, routeArgs);
        });
    });

    return done(null, { routes });
};

/**
 * @desc Handler for one route
 * @param {Object} seneca An Seneca intance
 * @param {Object} request Request
 * @param {Object} response Response
 * @param {Object} route An translated through seneca-web object
 * @returns {void}
 */
function handleRoute(seneca, request, response, route) {
    const {
        body,
        query,
        headers,
        method,
    } = request;

    const payload = {
        args: {
            body,
            query,
            headers,
            method,
            route: cleanRoute(route),
            user: request.user || null,
        },
    };

    // invoke an action
    seneca.act(route.pattern, payload, (error, data) => {
        if (error) {
            return response
                .status(500)
                .json({
                    statusCode: 500,
                    error: 'Internal Server Error',
                    message: error.message,
                });
        }

        if (route.redirect) {
            return response.redirect(route.redirect);
        }

        // handle of the rest of the sittuation
        const {
            statusCode,
            body,
            headers,
        } = data;

        response.status(statusCode);

        Object.keys(headers)
            .forEach((header) => {
                response.set(header, headers[header].toString());
            });

        response.json(body);
    });
}

/**
 * @desc Clean routes removing redundant things
 * @param {Object} route An translated through seneca-web object
 * @example of route
 * { prefix: '/user',
 * postfix: false,
 *  suffix: false,
 *  part: '',
 *  pin: 'role:user,cmd:*',
 *  alias: false,
 *  methods: [ 'GET' ],
 *  autoreply: true,
 *  redirect: false,
 *  auth: false,
 *  middleware: false,
 *  secure: false,
 *  pattern: 'role:user,cmd:getAll',
 *  path: '/user' } 
 * @returns {Object} The copy of the route object but without redundant properties
 */
function cleanRoute(route) {
    const _route = Object.assign({}, route);
    return omit(_route, [
        'part',
        'alias',
        'methods',
        'secure',
        'postfix',
        'suffix',
        'autoreply',
        'middleware',
        'prefix',
        'pin',
        'pattern',
    ]);
}

/**
 * @desc Remove keys from the object
 * @param {Object} object Object for manipulations
 * @param {Array} keys Array of keys, which would be removed from the object
 * @returns {Object} Object without redundant keys
 */
function omit(object, keys) {
    keys.forEach((key) => {
        delete object[key];
    });
    return object;
}
