const origin = require('../../../unity/origin/origin')
const drawQrcode = require('weapp-qrcode')




class Page {
  /**
   * 声明data
   */
  data = {
  }

  /**
   * 声明周期函数
   * 在onLoad后立即调用
   */
  async onStart() {
    drawQrcode({
      width: 270,
      height: 270,
      canvasId: 'myQrcode',
      text: `https://h5.h2o.cy-cube.com/store/info?store_id=${wx.getStorageSync('store_id')}`
    })
  }

  //调用接口
  async update() {
  }
  save() {
    wx.canvasToTempFilePath({
      canvasId: 'myQrcode',
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success() {
            wx.showModal({
              content: "保存成功",
              showCancel: false,
            })
          }
        })
      }
    })
  }

}

origin(Page)