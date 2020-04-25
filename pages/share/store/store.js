const origin = require('../../../unity/origin/origin')
const drawQrcode = require('weapp-qrcode')




class Page {
  /**
   * 声明data
   */
  data = {
    url: ''
  }

  /**
   * 声明周期函数
   * 在onLoad后立即调用
   */
  async onStart() {
    this.update()
  }

  //调用接口
  async update() {
    try {
      const res = await this.$http.post('/store/qr_code', {
        store_id: wx.getStorageSync('store_id')
      })
      if (res.code > 0) {
        this.setData({
          url: res.data.img
        })
      }
    } catch (error) {

    }
  }
  save() {
    wx.downloadFile({
      url: this.data.url,
      success(res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            wx.showModal({
              content: '保存成功',
              showCancel: false
            })
          },
          fail(e) {
            wx.showToast({
              title: '取消保存',
              icon: 'none'
            })
          }
        })
      }
    })


  }

}

origin(Page)