module.exports = class Router {
    $route = {
        query: {},
    };
    vm = null;
    constructor(vm) {
        this.vm = vm;
        this.$route.query = vm.options;
    }

    push(url = '', query = {}) {
        query = Object.keys(query).map((k) => `${k}=${query[k]}`).join('&');
        if (query) url += "?" + query;
        // console.warn(url);

        wx.navigateTo({ url: url });
    }

    go(delta = -1) {
        wx.navigateBack({ delta: Math.abs(delta) });
    }

    tab(url) {
        wx.switchTab({ url: url, });
    }

}