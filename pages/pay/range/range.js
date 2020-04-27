const origin = require('../../../unity/origin/origin')
const drawQrcode = require('weapp-qrcode')




class Page {
  /**
   * 声明data
   */
  data = {
    form: {
      distance: '',
      time: '',
    }
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
    if (!this.data.form.time || !this.data.form.distance) {
      wx.showToast({
        title: '请填写正确数据',
        icon: 'none'
      })
      return false
    }
    try {
      const res = await this.$http.post('/activity/order', this.data.form);
      if (res.code > 0) {
        let payInfo = res.data
        wx.requestPayment({
          timeStamp: payInfo['timestamp'],
          nonceStr: payInfo['nonceStr'],
          package: payInfo['package'],
          signType: payInfo['signType'],
          paySign: payInfo['paySign'],
          success: (res) => {
            wx.showModal({
              title: '成功',
              content: '购买成功',
              showCancel: false,
              success: (res) => {
                // this.$router.push('/pages/order/orderInfo/orderInfo', {
                //   order_id: order_id
                // })
                this.$router.go(-1);
              }
            })
          },
          fail: (res) => {
            console.warn(res);
          }
        });
      }
    } catch (error) {

    }
  }

}

origin(Page)