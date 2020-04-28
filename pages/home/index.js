const origin = require('../../unity/origin/origin')
const computedBehavior = require('miniprogram-computed')
/**
 * 页面类
 */
class Page {
  behaviors = [computedBehavior]
  data = {
    info: null,
    activ: 1
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
    const res = await this.$http.post('/store/data', {
      store_id: wx.getStorageSync('store_id')
    });
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

  }

  submit() {

  }
  onPullDownRefresh() {
    this.update()
  }
}

origin(Page);