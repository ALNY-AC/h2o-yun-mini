const origin = require('../../../unity/origin/origin')

class Page {
  /**
   * 声明data
   */
  data = {
    list: [],
    form: {
      store_id: ''
    },

  }

  /**
   * 声明周期函数
   * 在onLoad后立即调用
   */
  async onStart() {
    this.setData({
      'form.store_id': wx.getStorageSync('store_id')
    });
  }
  onShow() {
    this.setData({
      'form.store_id': wx.getStorageSync('store_id'),
    });
    this.update();
  }
  //调用接口
  async update() {
    const res = await this.$http.post('/water_coupon/list', this.data.form);
    if (res.code >= 0) {
      this.setData({
        list: res.data.list
      })
    }
  }

}

origin(Page)