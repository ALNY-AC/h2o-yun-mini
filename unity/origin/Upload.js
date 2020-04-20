const Url = require('./Url')

module.exports = class Upload {
    file = null;
    constructor(file) {
        this.file = file;
    }
    async push() {
        const file = await this.file.open();
        /**
         * 上传函数
         */
        return new Promise((resolve, reject) => {

            /**
             * 自定义上传封装
             */

            wx.uploadFile({
                url: Url.uploadUrl + '/api/file/upload',
                filePath: file,
                name: 'file',
                formData: {
                    'user': 'test'
                },
                success(res) {
                    const data = JSON.parse(res.data);
                    resolve(data.data.url);
                }
            })

        });
    }
}