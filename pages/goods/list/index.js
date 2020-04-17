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
    form:{
      page:1,
      page_size:10,
      store_id:2
    }
  }

  code = null;
  userInfo = null;

  /**
   * 监听data数据变化
   */
  observers = {
    msg() {
      // console.warn('更改');
      // this.setData({
      // msg2: this.data.msg.split(' ')[1]
      // });
    }
  }
  /**
   * 声明周期函数
   * 在onLoad后立即调用
   */
  async onStart() {

  }
  //初始化list为空
  onShow() {
    this.setData({
      list:[]
    })
    this.update();
  }
  //调用接口
  async update() {
    const res = await this.$http.post('/goods/list', this.data.form);
    if (res.code >= 0) {
      this.setData({
        list: [...this.data.list, ...res.data],
      })
      
    }
    wx.stopPullDownRefresh();
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
      ['form.page_size']: 10
    })
    this.update();
  }






}

origin(Page)