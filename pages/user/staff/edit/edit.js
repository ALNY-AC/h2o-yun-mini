const origin = require('../../../../unity/origin/origin')
const computedBehavior = require('miniprogram-computed')
const drawQrcode = require('weapp-qrcode')
/**
 * 页面类
 */
class Page {
  behaviors = [computedBehavior]
  data = {
  }
  computed = {

  }
  watch = {
  }

  onStart() {
    this.update()

  }
  onShow() {

  }
  async update() {
    let obj = {
      store_id: wx.getStorageSync('store_id'),
      store_name: wx.getStorageSync('store').name
    }
    drawQrcode({
      width: 265,
      height: 265,
      canvasId: 'myQrcode',
      text: JSON.stringify(obj)
    })
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

origin(Page);