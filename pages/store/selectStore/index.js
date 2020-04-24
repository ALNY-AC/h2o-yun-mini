const origin = require('../../../unity/origin/origin')
const computedBehavior = require('miniprogram-computed')
const Url = require('../../../unity/origin/Url')

class Page {
  behaviors = [computedBehavior]
  /**
   * 声明data
   */
  data = {
    list: []
  }
  computed = {
  }
  /**
   * 声明周期函数
   * 在onLoad后立即调用
   */
  async onStart() {
  }
  async onShow() {
    this.update();
  }
  async update() {
    const res = await this.$http.post('/store/list');
    this.setData({ list: res.data.list });
  }

  select(e) {
    let data = e.currentTarget.dataset.item;
    wx.setStorageSync('store', data);
    wx.setStorageSync('store_id', data.id);

    wx.reLaunch({
      url: '/pages/home/index'
    });

  }

}

origin(Page)