const origin = require('../../../unity/origin/origin')

class Page {
  /**
   * 声明data
   */
  data = {
    form: {
      page: 1,
      page_size: 10,
      store_id: 2
    },
    list: []
  }



  /**
   * 监听data数据变化
   */
  observers = {
    msg() {
      // console.warn('更改');
      // this.setData({
      // msg2: this.data.msg.split(' ')[1]
      // });
    },

  }
  /**
   * 声明周期函数
   * 在onLoad后立即调用
   */
  async onStart() {

  }
  onShow() {
    this.setData({
      list:[]
    })
    this.update();
  }
  async update() {
    const res = await this.$http.post('/class/list', this.data.form);
    if (res.code >= 0) {
      this.setData({
        list: [...this.data.list, ...res.data],
      })
      
    }
    wx.stopPullDownRefresh();
  }
  updateInit() {
    this.setData({
      list: [],
      ['form.page']: 1
    })
    this.update()
  }
  onPullDownRefresh() {
    this.updateInit();
  }
  onReachBottom() {
    this.setData({
      ['form.page']: ++this.data.form.page,
      ['form.page_size']: 10
    })
    this.update();
  }
  del(e) {
    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success: async(res) => {
        if (res.confirm) {
          const res1 = await this.$http.post('/class/del', {
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
}

origin(Page)