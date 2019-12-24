/**
 * 文件类
 */
module.exports = class File {
    /**
     * 可选择文件数量
     */
    count = 1;
    constructor(count = 1) {
        this.count = count;
    }
    async open() {
        return new Promise((resolve, reject) => {
            wx.chooseImage({
                count: this.count,
                success: (res) => {
                    const filePath = res.tempFilePaths[0];
                    resolve(filePath);
                },
                fail: () => {
                    reject(false)
                }
            });
        });
    }
}