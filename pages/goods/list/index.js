const origin = require('../../../unity/origin/origin')

class Page {
  /**
   * 声明data
   */
  data = {
    info: {
      title: "好",
      img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586957304625&di=00265dca96f1ac4236b3ba1208620fd4&imgtype=0&src=http%3A%2F%2Fimg009.hc360.cn%2Fg6%2FM07%2F5D%2FAB%2FwKhQsVNsW6aEP0DZAAAAAMqPSDE457.jpg'
    },
    list: [],
    form: {
      page: 1,
      page_size: 10,
    }
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
      'form.store_id': wx.getStorageSync('store_id')
    });
    this.updateInit();
  }
  //调用接口
  async update() {
    const res = await this.$http.post('/goods/list', this.data.form);
    if (res.code >= 0) {
      this.setData({
        list: [...this.data.list, ...res.data.list],
      })
    }
    wx.stopPullDownRefresh();
  }
  go(e) {
    this.$router.push('/pages/goods/edit/index', {
      id: e.currentTarget.dataset.id
    });
  }
  //初始化数据
  updateInit() {
    this.setData({
      list: [],
      ['form.page']: 1
    })
    this.update()
  }
  del(e) {
    wx.showModal({
      title: '提示',
      content: '确定删除吗',
      success: async (res) => {
        if (res.confirm) {
          const res1 = await this.$http.post('/goods/del', {
            id: e.currentTarget.dataset.id
          });
          if (res1.code >= 0) {
            this.$toast('删除成功');
            this.updateInit();
          } else {
            this.$toast(res1.msg);
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })


  }
  //下拉刷新
  onPullDownRefresh() {
    this.updateInit();
  }
  //上拉加载
  onReachBottom() {
    this.setData({
      ['form.page']: ++this.data.query.page,
      ['form.page_size']: 10
    })
    this.update();
  }






}

origin(Page)