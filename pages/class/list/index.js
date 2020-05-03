const origin = require('../../../unity/origin/origin')

class Page {

  data = {
    list: [],
    loading: false
  }

  onStart() {
    this.update();
  }
  async update() {
    const res = await this.$http.post('/class/list', {
      store_id: wx.getStorageSync('store_id')
    });
    if (res.code >= 0) {
      this.setData({
        list: res.data.list,
        loading: res.data.list.length > 0 ? false : true
      });
    }
    wx.stopPullDownRefresh()

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
          if (res1.code > 0) {
            this.$toast('删除成功');
          } else {
            this.$toast(res1.msg);
          }
          this.update();
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
  onPullDownRefresh() {
    console.warn(1);
    this.update()
  }
}

origin(Page)