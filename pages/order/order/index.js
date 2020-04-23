// pages/map/map.js
const origin = require('../../../unity/origin/origin')
const computedBehavior = require('miniprogram-computed')


/**
 * 页面类
 */
class Page {
  behaviors = [computedBehavior]
  data = {
    list: [{
        title: "千岛湖饮用水",
        state: "已完成",
        songfei: 6,
        price: 15,
        oprice: 20,
        ma: 51004,
        num: 9,
        desc: "",
        time: "2020-4-10 23:10:11",
        remark: "提前五分钟打电话",
        imageURL: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4045851339,2507043941&fm=15&gp=0.jpg"
      },
      {
        title: "农夫山泉",
        state: "已完成",
        songfei: 6,
        price: 12,
        oprice: 25,
        ma: 51004,
        num: 10,
        desc: "",
        time: "2020-4-9 20:10:11",
        remark: "顺便回收桶",
        imageURL: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586957304625&di=00265dca96f1ac4236b3ba1208620fd4&imgtype=0&src=http%3A%2F%2Fimg009.hc360.cn%2Fg6%2FM07%2F5D%2FAB%2FwKhQsVNsW6aEP0DZAAAAAMqPSDE457.jpg"
      }
    ],
    query: {
      page_size: 10,
      page: 1,
      store_id: 0,
      state: ''
    },
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
      const res = await this.$http.post('/order/list', this.data.query)
      if (res.code > 0) {
        this.setData({
          list: [...this.data.list, ...res.data.list]
        })
   
      }
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
      ['query.page']: ++this.data.form.page,
      ['query.page_size']: 10
    })
    this.update();
  }
   //初始化数据
   updateInit() {
    this.setData({
      list: [],
      ['query.page']: 1
    })
    this.update()
  }
}

origin(Page);