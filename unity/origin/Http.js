const Url = require('./Url')
const Middleware = require('./middleware/Middleware')
const config = require('./config')
function to() {
    return Object.keys(config).map(k => {
        let v = '';
        if (typeof config[k] == 'function') {
            v = `${k}=${config[k]()}`;
        } else {
            v = `${k}=${config[k]}`;
        }
        return v;
    }).join(';');
}
module.exports = class Http {

    baseUrl = Url.apiUrl;
    middleware = new Middleware();
    opt = null;
    constructor() {

    }

    async post(url, data = {}) {
        let opt = {
            url: this.baseUrl + url,
            data: data,
            method: "POST",
            header: {},
        };

        this.use(async (request, next) => {
            // console.warn(to(config));
            request.header.Authorization = to(config);
            let response = await next(request);
            return response.data;
        });

        this.opt = opt;

        this.use(async (request) => {
            return new Promise((resolve, reject) => {
                this.opt.success = (res) => {
                    if (res.statusCode == 500) {
                        reject(res);
                    } else {
                        resolve(res);
                    }
                };
                this.opt.fail = (res) => {
                    reject(res);
                };
                wx.request(this.opt);
            });
        });
        const res = await this.middleware.run(opt);

        this.middleware = new Middleware();

        return res;
    }

    get() {

    }
    use(f) {
        this.middleware.use(f);
        return this;
    }
}