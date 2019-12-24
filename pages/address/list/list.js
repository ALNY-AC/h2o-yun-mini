const origin = require('../../../unity/origin/origin')


class Page {
  data = {
    listarr: []
  }
  async onStart() {
    // await this.update()
  }
  async onShow() {
    await this.update()
  }
  computed = {
  }
  async update() {
    try {
      const res = await this.$http.post('/address/list', {});
      if (res.code <= 0) return;
      this.setData({
        listarr: res.data
      })
    } catch (error) { }
  }
  async setup(e) {
    e.currentTarget.dataset.item.is_default = 1
    try {
      const res = await this.$http.post('/address/save', e.currentTarget.dataset.item);
    
      if (res <= 0) return;
      await this.update()
      wx.showToast({
        title: '操作成功'
      })
    } catch (error) { }
  }
  editaddress(e) {
    wx.navigateTo({
      url: `/pages/address/edit/edit?id=${e.currentTarget.dataset.item.id}`
    })
  }
  async deleteaddress(e) {
    wx.showModal({
      title: '提示',
      content: '确认删除地址吗',
      success: async (zes) => {
        if (zes.cancel) return;
        try {
          const res = await this.$http.post('/address/del', {
            id: e.currentTarget.dataset.item.id
          });
          if (res <= 0) return;
          await this.update()
          wx.showToast({
            title: '操作成功'
          })
        } catch (error) {
        }
      }
    })
  }
}

origin(Page);