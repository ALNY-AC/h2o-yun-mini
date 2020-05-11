const origin = require('../../../unity/origin/origin')

class Page {
  /**
   * 声明data
   */
  data = {
    list: [],
    query: {
      store_id: '',
      page: 1,
      page_size: 10
    },
    loading: false,
  }

  /**
   * 声明周期函数
   * 在onLoad后立即调用
   */
  async onStart() {
    this.setData({
      'query.store_id': wx.getStorageSync('store_id')
    });
  }
  onShow() {
    this.updateInit();
  }
  //调用接口
  async update() {
    wx.showLoading({
      title: '加载中',
    })
    const res = await this.$http.post('/water_coupon/list', this.data.query);
    if (res.code > 0) {
      this.setData({
        ['query.page']: ++this.data.query.page,
        list: [...this.data.list, ...res.data.list],
        loading: res.data.list.length > 0 ? false : true
      })
    } else {
      this.setData({
        loading: this.data.list.length > 0 ? false : true
      })
    }
    wx.hideLoading()
    wx.stopPullDownRefresh();
  }
  updateInit() {
    this.setData({
      list: [],
      ['query.page']: 1,
    })
    this.update()
  }
  //下拉刷新
  onPullDownRefresh() {
    this.updateInit();
  }
  //上拉加载
  onReachBottom() {
    this.update();
  }
}

origin(Page)