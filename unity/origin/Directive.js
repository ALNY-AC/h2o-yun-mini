var modelTool = {
    OModel: {
        picker(e) {
        },
        input(e) {
            let key = e.currentTarget.dataset.model;

            let value = '';
            if (typeof e.detail == "object") {
                value = e.detail.value;
            }
            if (typeof e.detail == "string") {
                value = e.detail;
            }
            if (typeof e.detail == "number") {
                value = e.detail;
            }
            if (typeof e.detail == "boolean") {
                value = e.detail;
            }
            if (Array.isArray(e.detail)) {
                value = e.detail;
            }
            if (typeof e.currentTarget.dataset['value'] != 'undefined') {
                value = e.currentTarget.dataset['value'];
            }

            this.setData({ [key]: value });
        }
    }
}


module.exports = function (methods) {


    methods['o-model'] = function (e) {
        let dataset = e.currentTarget.dataset;

        let modelType = typeof dataset.modelType == 'undefined' ? 'input' : dataset.modelType;
        if (modelTool.OModel[modelType]) {
            modelTool.OModel[modelType].call(this, e);
        } else {
            console.warn(`[origin] ${modelType} 是无效的Model方式!`);
        }
        let method = dataset['method'] ? dataset['method'] : false;
        if (method) {
            if (this[method]) {
                this[dataset['method']](e);
            } else {
                console.warn(`[origin] ${method} 方法不存在!`);
            }
        }
    }


    methods['o-router'] = function (e) {
        let dataset = e.currentTarget.dataset;
        this.$router.push(dataset.url);
    }

    return methods;

}