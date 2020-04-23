const origin = require('../../../unity/origin/origin')
const drawQrcode = require('weapp-qrcode')




class Page {
  /**
   * 声明data
   */
  data = {
    info: null
  }

  /**
   * 声明周期函数
   * 在onLoad后立即调用
   */
  async onStart() {
    this.update();
    drawQrcode({
      width: 200,
      height: 200,
      canvasId: 'myQrcode',
      text: `http://h5.h2o.cy-cube.com/pay/ticket?id=${this.$route.query.id}`
    })
  }

  //调用接口
  async update() {
    const res = await this.$http.post('/water_coupon/info', {
      id: this.$route.query.id
    });
    if (res.code >= 0) {
      this.setData({
        info: res.data
      })
    }

  }
  save() {
    wx.canvasToTempFilePath({
      canvasId: 'myQrcode',
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
        })
      }
    })
  }

}

origin(Page)