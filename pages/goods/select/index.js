const origin = require('../../../unity/origin/origin')

class Page {
  /**
   * 声明data
   */
  data = {
    list: [],
    selectList: [],
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
    if (wx.getStorageSync('goodsSelectList')) {
      this.setData({
        selectList: wx.getStorageSync('goodsSelectList')
      });
    }
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
  select(e) {
    let info = e.currentTarget.dataset.info;
    let id = info.id;
    let list = this.data.selectList;


    if (list.indexOf(id) >= 0) {
      // 存在就删除
      list = list.filter(el => el.id != id);
      this.setData({ selectList: list });
    } else {
      // 不存在就添加
      list.push(id);
    }
    this.setData({ selectList: list });
    wx.setStorageSync('goodsSelectList', list);
    console.warn(list);

  }
  //初始化数据
  updateInit() {
    this.setData({
      list: [],
      ['form.page']: 1
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
      ['form.page']: ++this.data.form.page,
    })
    this.update();
  }



}

origin(Page)