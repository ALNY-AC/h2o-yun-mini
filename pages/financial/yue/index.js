const origin = require('../../../unity/origin/origin')

class Page {
  /**
   * 声明data
   */
  data = {
    info:null,
    id: ''
  }

  /**
   * 声明周期函数
   * 在onLoad后立即调用
   */
  async onStart() {

  }
  async onShow(){
    this.id = wx.getStorageSync('store_id');
    this.update();
  }
  async update() {
    const res = await this.$http.post('/store/profile/info', {
      id: this.id
    });
    if(res.code>=0){
      let data = res.data;
      this.setData({ info: data })
    }
    wx.stopPullDownRefresh();
  }
  //下拉刷新
  onPullDownRefresh() {
    this.update();
  }

}

origin(Page)