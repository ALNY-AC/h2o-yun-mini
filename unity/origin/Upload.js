const Url = require('./Url')

module.exports = class Upload {
    file = null;
    constructor(file) {
        this.file = file;
    }
    async push() {
        const res = await this.file.open();
        /**
         * 上传函数
         */
        return new Promise((resolve, reject) => {

            /**
             * 自定义上传封装
             */

            // wx.uploadFile({
            //     url: Url.apiUrl + '', //仅为示例，非真实的接口地址
            //     filePath: tempFilePaths[0],
            //     name: 'file',
            //     formData: {
            //         'user': 'test'
            //     },
            //     success(res) {
            //         const data = res.data
            //         //do something
            //     }
            // })
            let url = res;
            resolve(url);
        });
    }
}