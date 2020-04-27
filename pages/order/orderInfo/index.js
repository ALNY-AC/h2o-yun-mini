const origin = require('../../../unity/origin/origin')
const computedBehavior = require('miniprogram-computed')
class Page {
  behaviors = [computedBehavior]
  data = {
    info: null,
    stateArr: [
      { title: '待支付', state: 0 },
      { title: '等待配送', state: 1 },
      { title: '配送中', state: 2 },
      { title: '已完成', state: 4 },
      { title: '订单取消', state: 5 },
      { title: '订单异常', state: 9 },
      { title: '退款申请', state: 21 }
    ]
  }
  computed = {
    totalPrice(data) {
      if (!data.info) return;
      let total = data.info.snapshotInfo.map(el => el.data.price * el.data.quantity).reduce((total, el) => total + el, 0);
      return (total + parseFloat(data.info.freight_price)).toFixed(2);
    },
    addressUser(data) {
      if (!data.info) return '';
      return `${data.info.addressInfo.contacts}(${data.info.addressInfo.gender == '1' ? '先生' : '女士'}) ${data.info.addressInfo.phone}`
    },
    orderState(data) {
      if (!data.info) return ''
      let order = data.stateArr.find(el => el.state == data.info.state)
      return order.title
    },
    payMethod(data) {
      if (!data.info) return ''
      if (data.info.type == 'pay_order') {
        return '在线支付'
      }
      if (data.info.type == 'water_order') {
        return '水票支付'
      }
    }
  }
  onStart() {
    this.update();
  }
  // onUnload() {
  //   wx.switchTab({
  //     url: '/pages/order/order'
  //   })
  // }
  // async payment() {
  //   const payInfo = await this.$http.post('/order/getMini', {
  //     pay_id: this.data.info.pay_id
  //   });
  //   wx.requestPayment({
  //     timeStamp: payInfo.data['timestamp'],
  //     nonceStr: payInfo.data['nonceStr'],
  //     package: payInfo.data['package'],
  //     signType: payInfo.data['signType'],
  //     paySign: payInfo.data['paySign'],
  //     success: (res) => {
  //       wx.showModal({
  //         title: '成功',
  //         content: '支付成功',
  //         showCancel: false,
  //         success: (res) => {
  //           this.update();
  //         }
  //       })
  //     },
  //     fail: (res) => {
  //       console.warn(res);
  //       this.update();
  //     }
  //   });
  // }
  async update() {
    const res = await this.$http.post('/order/info', {
      order_id: this.$route.query.order_id
    });
    if (res.code >= 0) {
      res.data.snapshotInfo.forEach(url => {
        url.data.goods_head = this.$getUrl(url.data.goods_head)
      })
      this.setData({
        info: res.data

      });
    }
  }
  async http_Close() {
    try {
      const res = await this.$http.post('/order/close_order', {
        order_id: this.$route.query.order_id
      });
      if (res.code > 0) {
        if (this.data.info.state == 21) {
          wx.showToast({
            title: '退款成功',
            icon: 'none',
            duration: 1000
          })
        } else {
          wx.showToast({
            title: '已取消订单，如用户已付款退款将退还给用户',
            icon: 'none',
            duration: 1000
          })
        }
        this.update()
      }
    } catch (error) {
      console.warn(error);
    }

  }
}

origin(Page);