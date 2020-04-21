const origin = require('../../../unity/origin/origin')

class Page {
  
  data = {
    list: []
  }

  async onStart() {
    this.update();
  }
  onShow() {
    this.update();
  }
  async update() {
    const res = await this.$http.post('/class/list', {
      store_id: wx.getStorageSync('store_id')
    });
    if (res.code >= 0) {
      this.setData({
        list: res.data.list
      });
    }
  }
  del(e) {
    wx.showModal({
      title: '提示',
      content: '确定删除吗',
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