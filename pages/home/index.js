const origin = require('../../unity/origin/origin')
const computedBehavior = require('miniprogram-computed')
/**
 * 页面类
 */
class Page {
  behaviors = [computedBehavior]
  data = {
    info: null
  }
  computed = {

  }
  watch = {}

  /**
   * 启动函数
   */
  async onStart() {

  }
  async onShow() {
    const res = await this.$http.post('/store/data', {
      store_id: wx.getStorageSync('store_id')
    });
    if (res.code >= 0) {
      this.setData({
        info: res.data
      })
    }
  }
  async update() {

  }

  submit() {

  }
}

origin(Page);