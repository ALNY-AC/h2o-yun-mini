const origin = require('../../unity/origin/origin')
const computedBehavior = require('miniprogram-computed')
/**
 * 页面类
 */
class Page {
  behaviors = [computedBehavior]
  data = {
    info: null,
    activ: ''
  }
  computed = {

  }
  watch = {}

  /**
   * 启动函数
   */
  async onStart() {
    this.update()
  }
  async onShow() {

  }
  async update() {
    wx.showLoading({
      title: '加载中',
    })
    const res = await this.$http.post('/store/data', {
      store_id: wx.getStorageSync('store_id'),
      times: this.data.activ,
    });
    wx.hideLoading()
    wx.stopPullDownRefresh()
    if (res.code >= 0) {
      this.setData({
        info: res.data
      })
    }
  }
  choice(e) {
    this.setData({
      activ: e.currentTarget.dataset.value
    })
    this.update()
  }

  submit() {

  }
  onPullDownRefresh() {
    this.update()
  }
}

origin(Page);