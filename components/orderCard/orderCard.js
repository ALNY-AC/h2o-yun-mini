const origin = require('../../unity/origin/origin')
const computedBehavior = require('miniprogram-computed')
const Http = require('../../unity/origin/Http')
const http = new Http();


class Banner {
  behaviors = [computedBehavior]
  options = {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
  }
  properties = {
    title: String,
    state: String,
    totalPrice: String,
    info: {
      type: Object,
      default: null
    }
  }
  computed = {
    style(data) {
      let style = [];
      if (data.radius) {
        style.push(`border-radius:${data.radius}`);
      }
      return style.join(';');
    },
    orderState(data) {
      if (!data.info) return ''
      let order = data.stateArr.find(el => el.state == data.info.state)
      return order.title
    },
    footerState(data) {
      if (!data.info) return false
      if (data.info.state == 1 || data.info.state == 21) {
        return true
      }
      return false
    }
  }

  data = {
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
  onStart() {
    console.log(info)
    console.warn('Banner');
  }
  delivery() {
    try {
      wx.showModal({
        content: '是否开始配送',
        success: (res) => {
          if (res.confirm) {
            this.http_delivery()
          }
        }
      })
    } catch (error) {
      console.warn(error);
    }
  }
  async http_delivery() {
    try {
      const res = await http.post('/order/sending', {
        order_id: this.data.info.order_id
      })
      if (res.code > 0) {
        wx.showToast({
          title: '开始配送',
          icon: 'none'
        })
        this.setData({
          ['info.state']: 2
        })
      }
    } catch (error) {
      console.warn(error);
    }
  }
  Close() {
    try {
      wx.showModal({
        title: '是否同意退款',
        content: '退款将返还给用户',
        success: (res) => {
          if (res.confirm) {
            this.http_Close()
          }
        }
      })
    } catch (error) {
      console.warn(error);
    }

  }
  async http_Close() {
    try {
      const res = await http.post('/order/close_order', {
        order_id: this.data.info.order_id
      });
      if (this.data.info.state == 21) {
        wx.showToast({
          title: '退款成功',
          icon: 'none',
          duration: 1000
        })
        this.setData({
          ['info.state']: 5
        })
      }
    } catch (error) {
      console.warn(error);
    }
  }
}

origin(Banner)