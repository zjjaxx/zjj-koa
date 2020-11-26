module.exports = class Router {
    constructor() {
        this.routes = []
    }
    get(route, callback) {
        this.routes.push({ route, callback, method: "GET" })
    }
    post(route, callback) {
        this.routes.push({ route, callback, method: "POST" })
    }
    routesMiddleware() {
        const _routes = this.routes
        return async function (context, next) {
            const { url, method } = context.request
            _routes.forEach(routeObj => {
                if (url == routeObj.route && routeObj.method == method) {
                    routeObj.callback(context, next)
                }
            });
        }

    }
}