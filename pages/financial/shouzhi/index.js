const origin = require('../../../unity/origin/origin')

class Page {
  /**
   * 声明data
   */
  data = {
    date: new Date().Format('yyyy-MM-dd'),
    list: [],
  }
  id = '';
  /**
   * 声明周期函数
   * 在onLoad后立即调用
   */
  async onStart() {
    this.id = wx.getStorageSync('store_id');
    this.update();
  }
  async update() {
    const res = await this.$http.post('/budget/list', {
      store_id: this.id,
      times: this.data.date
    });

    this.setData({ list: res.data.list })
  }
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    });
    this.update();
  }


}

origin(Page)