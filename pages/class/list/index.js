const origin = require('../../../unity/origin/origin')

class Page {
  /**
   * 声明data
   */
  data = {
    form: {
      store_id: wx.getStorageSync('store_id')
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
    this.update();
  }
  onShow() {
    this.update();
  }
  async update() {
    const res = await this.$http.post('/class/list', this.data.form);
    if (res.code >= 0) {
      this.setData({
        list: res.data.list
      });
    }
  }
  del(e) {
    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success: async (res) => {
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