const origin = require('../../../unity/origin/origin')

class Page {
  /**
   * 声明data
   */
  data = {
    info: {
      freeze_money: 0.00,
      money: 0.01,
    },
    id: ''
  }

  /**
   * 声明周期函数
   * 在onLoad后立即调用
   */
  async onStart() {
    this.id = wx.getStorageSync('store_id');
    this.update();
  }
  async update() {

    const res = this.$http.post('/store/profile/info', {
      id: this.id
    });
    let data = res.data;

    this.setData({ info: data })


  }


}

origin(Page)