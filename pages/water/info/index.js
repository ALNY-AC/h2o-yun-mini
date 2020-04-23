const origin = require('../../../unity/origin/origin')

class Page {
  /**
   * 声明data
   */
  data = {
    info: null,
    goodsList: [],
    list:[],
    query:{
      page:1,
      page_size:10,
      water_coupon_id:''
    }
  }

  /**
   * 声明周期函数
   * 在onLoad后立即调用
   */
  async onStart() {
    this.setData({
      'query.water_coupon_id':this.$route.query.id
    })
    this.update();
  }

  //调用接口
  async update() {
    const res = await this.$http.post('/water_coupon/info', {
      id: this.$route.query.id
    });
    if (res.code >= 0) {
      await this.setData({
        info: res.data
      })
      this.httpGoods();
      this.httpUsers();

    }
  }
  async httpGoods() {
    const res = await this.$http.post('/goods/list', {
      goods_ids: this.data.info.goods_id,
      store_id: wx.getStorageSync('store_id')
    });
    this.setData({ goodsList: res.data.list });
  }
  async httpUsers() {
    // 销售记录
    const res = await this.$http.post('/water_coupon/user_water_coupon', this.data.query);
    if (res.code >= 0) {
      this.setData({
        list: [...this.data.list, ...res.data.list],
      })
    }
    wx.stopPullDownRefresh();
  }
  updateInit() {
    this.setData({
      list: [],
      ['query.page']: 1
    })
    this.update();
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
    this.httpUsers();
  }
  del(e) {
    wx.showModal({
      title: '提示',
      content: '确定删除吗',
      success: async (res) => {
        if (res.confirm) {
          const res1 = await this.$http.post('/water_coupon/del', {
            id: this.data.info.id,
            store_id: wx.getStorageSync('store_id')
          });
          if (res1.code >= 0) {
            this.$toast('删除成功');
            this.$router.go(-1)
          } else {
            this.$toast(res1.msg);
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  }


}

origin(Page)