const Http = require('./Http')
const Router = require('./Router')
const common = require('./common')
const Directive = require('./Directive')
const Random = require('./Random')
const Url = require('./Url')

module.exports = function origin(className) {

    let handlePage = new HandlePage();


    /**
     * 处理节点
     */

    const nodes = handlePage.handleNode(className);

    /**
     * 处理函数
     */

    const methods = Directive(handlePage.handleMethods(className));



    /**
     * 启动后处理
     */
    methods.onLoad = function () {
        let pages = getCurrentPages();
        pages = pages[pages.length - 1];
        
        if (pages.route.indexOf('store') < 0) {
            
            if (
                pages.route.indexOf('login') < 0
                && pages.route.indexOf('selectStore') < 0
            ) {
                if (!wx.getStorageSync('jwt')) {
                    wx.reLaunch({
                        url: '/pages/login/login'
                    });
                    return;
                }
                if (!wx.getStorageSync('store') || !wx.getStorageSync('store_id')) {
                    
                    wx.reLaunch({
                        url: '/pages/store/selectStore/index'
                    });
                    return;
                }

            }
        }



        /**
         * 处理http
         */
        handlePage.handleSetData(this);
        handlePage.handleHttp(this);
        handlePage.handleRouter(this);
        this.setData({ $app: getApp().globalData });
        if (this.onStart) {
            this.onStart();
        }

    }

    methods.$getRandom = new Random().getRandom;
    methods.$openid = function () {
        return new Promise((resolve, reject) => {
            wx.login({
                success: async ({ code }) => {
                    const res = await this.$http.post('/auth/openid', { code: code });
                    resolve(res.data);
                }
            })
        });
    }
    methods.$isLogin = function () {
        if (!wx.getStorageSync('jwt')) {
            return false;
        } else {
            return true;
        }
    }

    methods.$getUrl = function (url) {
        if (!url) return '';
        if (url.indexOf('./') >= 0) return url;
        let _url;
        if (url.indexOf('http') == -1) {
            _url = Url.imgUrl + url;
        } else {
            _url = url;
        }
        _url = _url.replace(/\\/g, "/");
        return _url;
    }
    methods.$toast = function (str) {
        wx.showToast({
            title: str,
            icon: 'none'
        })
    }

    const page = {
        methods: methods
    }

    nodes.forEach(el => {
        page[el.key] = el.value;
    });

    if (page.data) {
        page.data.$app = getApp().globalData;
    }


    // handlePage
    //     .handleOpt()
    //     .handleHttp()
    //     .handleRouter()
    //     .handleWatch()


    let a = Component(page);

}


class HandlePage {
    page = null;
    watchs = {};
    methods = {};

    handleNode(className) {

        let obj = new className();
        let nodes = Object.getOwnPropertyNames(obj).map(k => ({ key: k, value: obj[k] }));
        return nodes;
    }

    handleMethods(className) {
        let methods = {};
        Object.getOwnPropertyNames(className.prototype).forEach(k => {
            if (k !== 'constructor') {
                methods[k] = className.prototype[k];
            }
        });
        return methods;
    }


    handleHttp(vm) {
        const http = new Http();
        vm.$http = http;
    }

    handleRouter(vm) {
        vm.$router = new Router(vm);
        vm.$route = vm.$router.$route;
    }

    handleWatch(vm) {
        const watchs = this.watchs;
        vm.$watch = (dataName, fun) => {
            this.watchs[dataName] = fun;
        }
        const setData = vm.setData;
        vm.setData = function (opt) {

            return new Promise((resolve, reject) => {
                setData.call(vm, opt, (e) => {
                    resolve(e)
                });
            });
            // Object.keys(opt).forEach((k) => {
            //     if (watchs[k]) {
            //         watchs[k].call(vm, opt[k]);
            //     }
            // });
        }

    }
    handleSetData(vm) {
        const setData = vm.setData;
        vm.setData = function (opt) {
            return new Promise((resolve, reject) => {
                setData.call(vm, opt, (e) => {
                    resolve(e)
                });
            });

        }
    }

}

