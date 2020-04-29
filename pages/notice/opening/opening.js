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
      tmplIds: ['TLLU__S0M0pYP0v8gf-0REPC3Ou5PJo1RnMUsRg-TaA'],
      success: (res) => {

        if (res['TLLU__S0M0pYP0v8gf-0REPC3Ou5PJo1RnMUsRg-TaA'] == 'accept') {
          wx.showToast({
            title: '开通成功~',
            icon: 'none'
          })
          this.setData({
            btn_state: false
          })
        }
        if (res['TLLU__S0M0pYP0v8gf-0REPC3Ou5PJo1RnMUsRg-TaA'] == 'reject') {
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