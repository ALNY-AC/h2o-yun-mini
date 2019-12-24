const MiddlewareNext = require('./MiddlewareNext')

module.exports = class Middleware {
    constructor() {
        this.middlewares = [];
    }
    use(middleware) {
        this.middlewares.push(middleware);
        return this;
    }
    async run(request) {
        const middlewareNext = new MiddlewareNext(this.middlewares);
        return await middlewareNext.next(request);
    }
}


