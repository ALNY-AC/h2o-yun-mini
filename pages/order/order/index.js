// pages/map/map.js
const origin = require('../../../unity/origin/origin')
const computedBehavior = require('miniprogram-computed')


/**
 * 页面类
 */
class Page {
  behaviors = [computedBehavior]
  data = {
    list: [],
    query: {
      page_size: 10,
      page: 1,
      store_id: 0,
      state: ''
    },
    loading: false
  }
  computed = {

  }
  watch = {}

  /**
   * 启动函数
   */
  async onStart() {
    this.setData({
      ['query.store_id']: wx.getStorageSync('store_id')
    })
    this.update()
  }
  async update() {
    try {
      wx.showLoading({
        title: '加载中',
      })
      const res = await this.$http.post('/order/list', this.data.query)
      if (res.code > 0) {
        res.data.list.forEach(el => {
          el.snapshotInfo.forEach(url => {
            url.data.goods_head = this.$getUrl(url.data.goods_head)
          })
        })
        this.setData({
          list: [...this.data.list, ...res.data.list],
          loading: res.data.list.length > 0 ? false : true
        })
      } else {
        this.setData({
          loading: res.data.list.length > 0 ? false : true
        })
      }
      wx.hideLoading()
      wx.stopPullDownRefresh();
    } catch (error) {
      console.warn(error);

    }
  }
  //选择tab改变state请求
  onChange(e) {
    if (e.detail.index == 0) {
      this.setData({
        'query.state': ''
      })
    }
    if (e.detail.index == 1) {
      this.setData({
        'query.state': 0
      })
    }
    if (e.detail.index == 2) {
      this.setData({
        'query.state': 1
      })
    }
    if (e.detail.index == 3) {
      this.setData({
        'query.state': 2
      })
    }
    if (e.detail.index == 4) {
      this.setData({
        'query.state': 4
      })
    }
    if (e.detail.index == 5) {
      this.setData({
        'query.state': 5
      })
    }
    if (e.detail.index == 6) {
      this.setData({
        'query.state': 21
      })
    }
    this.updateInit();
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
  //初始化数据
  updateInit() {
    this.setData({
      list: [],
      ['query.page']: 1,
      loading: false
    })
    this.update()
  }
}

origin(Page);