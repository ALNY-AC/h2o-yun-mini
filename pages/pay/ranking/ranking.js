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
  }

  //调用接口
  async update() {
  }
  async submit() {


  }
  test() {
    wx.requestSubscribeMessage({
      tmplIds: ['TLLU__S0M0pYP0v8gf-0REPC3Ou5PJo1RnMUsRg-TaA'],
      success(res) {
        console.warn(res);
      }
    })
  }

}

origin(Page)