const origin = require('../../../unity/origin/origin')
const drawQrcode = require('weapp-qrcode')




class Page {
  /**
   * 声明data
   */
  data = {
    openingState: false,
    btn_state: true
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
    wx.getSetting({
      withSubscriptions: true,
      success: (res) => {
        console.warn(res);
        this.setData({
          openingState: res.subscriptionsSetting.mainSwitch
        })
      }
    })
  }
  async submit() {


  }
  opening() {
    wx.requestSubscribeMessage({
      tmplIds: ['vJY7NVaVRgldafpF54RFPxCRMGZFwfNTzJ9w0Umu6Io'],
      success: (res) => {
        if (res['vJY7NVaVRgldafpF54RFPxCRMGZFwfNTzJ9w0Umu6Io'] == 'accept') {
          wx.showToast({
            title: '开通成功~',
            icon: 'none'
          })
          this.setData({
            btn_state: false
          })
        }
        if (res['vJY7NVaVRgldafpF54RFPxCRMGZFwfNTzJ9w0Umu6Io'] == 'reject') {
          wx.showToast({
            title: '开通失败，请重试',
            icon: 'none'
          })
        }
      }
    })
  }

}

origin(Page)