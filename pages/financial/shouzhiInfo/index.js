const origin = require('../../../unity/origin/origin')

class Page {
  /**
   * 声明data
   */
  data = {
    info: {
    },
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
    const res = this.$http.post('/budget/list', {
      id: this.id
    });
    let data = res.data;
    this.setData({ info: data })
  }


}

origin(Page)