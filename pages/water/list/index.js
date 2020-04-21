const origin = require('../../../unity/origin/origin')

class Page {
  /**
   * 声明data
   */
  data = {
    list: [],
    form: {
      page: 1,
      page_size: 10,
      store_id:''
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
    const res = await this.$http.post('/water_coupon/list', this.data.form);
    if (res.code >= 0) {
      this.setData({
        list: [...this.data.list, ...res.data],
      })
  
    }
    wx.stopPullDownRefresh();
  }
  go(e) {
    this.$router.push('/pages/goods/edit/index', {
      id: e.currentTarget.dataset.item.id
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




}

origin(Page)