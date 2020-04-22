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
      store_id: ''
    },
    
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
    // 动态获取个数
 let width =  Math.ceil((wx.getSystemInfoSync().windowWidth-40)/20);

    this.setData({
      'form.store_id': wx.getStorageSync('store_id'),
      number:width
    });
    this.update();
  }
  //调用接口
  async update() {
    const res = await this.$http.post('/water_coupon/list', this.data.form);
    if (res.code >= 0) {
      this.setData({
        list:res.data.list
      })

    }

  }






}

origin(Page)