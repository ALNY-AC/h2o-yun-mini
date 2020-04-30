const origin = require('../../../unity/origin/origin')
// const drawQrcode = require('weapp-qrcode')
class Page {
  /**
   * 声明data
   */
  data = {
    list: [],
    query: {
      page: 1,
      page_size: 10,
      store_id: ''
    },
    total: 0,
    loading: false,
  }

  /**
   * 声明周期函数
   * 在onLoad后立即调用
   */
  async onStart() {
    this.setData({
      ['query.store_id']: wx.getStorageSync('store_id')
    })

    this.update()
  }

  //调用接口
  async update() {
    try {
      wx.showLoading({
        title: '加载中',
      })
      const res = await this.$http.post('/store/user', this.data.query);
      if (res.code > 0) {
        this.setData({
          list: [...this.data.list, ...res.data.list],
          ['query.page']: ++this.data.query.page,
          loading: res.data.total > 0 ? false : true
        })
      } else {
        this.setData({
          loading: this.data.total > 0 ? false : true
        })
      }
      wx.hideLoading()
      wx.stopPullDownRefresh()
    } catch (error) {
    }
  }
  async submit() {
    console.warn(1);
  }
  onPullDownRefresh() {

    this.setData({
      list: [],
      ['query.page']: 1,
      loading: false
    })
    this.update()
  }
  onReachBottom() {
    this.update()
  }

}

origin(Page)