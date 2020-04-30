const origin = require('../../unity/origin/origin')
const computedBehavior = require('miniprogram-computed')
const Http = require('../../unity/origin/Http')
const http = new Http();


class Banner {
  behaviors = [computedBehavior]
  options = {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
    styleIsolation: 'shared'
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
    payMethod(data) {
      if (!data.info) return false
      if (data.info.type == 'pay_order') {
        return '在线支付'
      }
      if (data.info.type == 'water_order') {
        return '水票支付'
      }
    },
    head_class(data) {
      if (!data.info) return false
      if (data.info.state == 1) {
        return 'panel-head-1'
      }
      if (data.info.state == 2) {
        return 'panel-head-2'
      }
      if (data.info.state == 4) {
        return 'panel-head-4'
      }
      if (data.info.state == 5) {
        return 'panel-head-5'
      }
      if (data.info.state == 21) {
        return 'panel-head-21'
      }
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
  async http_delivery() {
    try {
      wx.showLoading({
        title: '加载中',
      })
      const res = await http.post('/order/sending', {
        order_id: this.data.info.order_id
      })
      this.httpSucces();
      wx.hideLoading()
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
  close() {
    try {
      wx.showModal({
        title: '是否同意退款？',
        content: '确认后退款将返还给用户',
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
  cancel() {
    try {
      wx.showModal({
        title: '是否取消订单？',
        content: '确认后钱将立即返回给用户',
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
      wx.showLoading({
        title: '加载中',
      })
      const res = await http.post('/order/close_order', {
        order_id: this.data.info.order_id
      });
      this.httpSucces();
      wx.hideLoading()
      if (res.code > 0) {
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
  complete() {
    try {
      wx.showModal({
        content: '配送是否已完成',
        cancelText: '否',
        confirmText: '是',
        success: (res) => {
          if (res.confirm) {
            this.http_complete()
          }
        }
      })
    } catch (error) {
      console.warn(error);
    }
  }
  async http_complete() {
    try {
      wx.showLoading({
        title: '加载中',
      })
      const res = await http.post('/order/success', {
        order_id: this.data.info.order_id
      })
      this.httpSucces();
      wx.hideLoading()
      if (res.code > 0) {
        wx.showToast({
          title: '配送完成',
          icon: 'none'
        })
        this.setData({
          ['info.state']: 4
        })
      }
    } catch (error) {
      wx.showModal({
        title: '操作失败',
        content: '请刷新后重试或联系客服',
        showCancel: false,
        confirmText: '知道了'
      })
      console.warn(error);
    }
  }
  goMap() {
    wx.openLocation({
      latitude: parseFloat(this.data.info.x),
      longitude: parseFloat(this.data.info.y),
      address: this.data.info.address,
    })
  }
  goTelephone() {
    wx.makePhoneCall({
      phoneNumber: this.data.info.phone
    })
  }
  httpSucces(){
    this.triggerEvent('on-state')
  } 
}

origin(Banner)