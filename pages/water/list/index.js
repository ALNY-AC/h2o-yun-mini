const origin = require('../../../unity/origin/origin')

class Page {
  /**
   * 声明data
   */
  data = {
    list: [],
    query: {
      store_id: '',
      page:1,
      page_size:10
    },

  }

  /**
   * 声明周期函数
   * 在onLoad后立即调用
   */
  async onStart() {
    this.setData({
      'query.store_id': wx.getStorageSync('store_id')
    });
    this.updateInit();
  }
  onShow() {
    this.setData({
      'query.store_id': wx.getStorageSync('store_id'),
    });

  }
  //调用接口
  async update() {
    const res = await this.$http.post('/water_coupon/list', this.data.query);
    if (res.code >= 0) {
      this.setData({
        list: res.data.list
      })
    }
    wx.stopPullDownRefresh();
  }
  updateInit() {
    this.setData({
      list: [],
      ['query.page']: 1
    })
    this.update()
  }
   //下拉刷新
   onPullDownRefresh() {
    this.updateInit();
  }
  //上拉加载
  onReachBottom() {
    this.setData({
      ['query.page']: ++this.data.query.page,
      ['query.page_size']: 10
    })
    this.update();
  }
}

origin(Page)