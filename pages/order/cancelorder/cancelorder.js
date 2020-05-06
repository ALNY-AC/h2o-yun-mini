const origin = require('../../../unity/origin/origin')
const computedBehavior = require('miniprogram-computed')


/**
 * 页面类
 */
class Page {
  behaviors = [computedBehavior]
  data = {
    explain: ''
  }
  computed = {

  }
  watch = {
  }

  /**
   * 启动函数
   */
  async onStart() {
  }
  async update() {

  }
  submit() {
    try {
      wx.showModal({
        title: '是否取消用户退款申请？',
        content: `说明：${this.data.explain}`,
        success: (res) => {
          if (res.confirm) {
            this.http_cancelRefund()
          }
        }
      })
    } catch (error) {
      console.warn(error);
    }
  }
  async http_cancelRefund() {
    try {
      wx.showLoading({
        title: '加载中',
      })
      const res = await this.$http.post('/order/reject', {
        order_id: this.$route.query.order_id,
        store_remarks: this.data.explain
      })
      wx.hideLoading()
      if (res.code > 0) {
        wx.showToast({
          title: '取消退款申请成功',
          icon: 'none'
        })
        this.$router.go(-1)
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
}

origin(Page);