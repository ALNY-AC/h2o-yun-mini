module.exports = class MiddlewareNext {
    constructor(middlewares) {
        this.index = -1;
        this.middlewares = middlewares;
    }
    async next(request) {
        this.index++;
        if (this.index >= this.middlewares.length) {
            return request;
        }
        else {
            return this.middlewares[this.index](request, (_request) => this.next(_request));
        }
    }
}
