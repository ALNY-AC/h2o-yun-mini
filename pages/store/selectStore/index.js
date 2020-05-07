const origin = require('../../../unity/origin/origin')
const computedBehavior = require('miniprogram-computed')
const Url = require('../../../unity/origin/Url')

class Page {
  behaviors = [computedBehavior]
  /**
   * 声明data
   */
  data = {
    list: []
  }
  computed = {
  }
  /**
   * 声明周期函数
   * 在onLoad后立即调用
   */
  onStart() {
    this.update();
  }
  async update() {
    const res = await this.$http.post('/store/list');
    wx.stopPullDownRefresh()
    if (res.code > 0) {
      this.setData({ list: res.data.list });
    }
  }

  select(e) {
    let data = e.currentTarget.dataset.item;
    wx.setStorageSync('store', data);
    wx.setStorageSync('store_id', data.id);

    wx.reLaunch({
      url: '/pages/home/index'
    });
  }
  binding() {
    wx.scanCode({
      success: (res) => {
        wx.showModal({
          title: '是否绑定此门店',
          content: `确认绑定(${JSON.parse(res.result).store_name})吗？`,
          success: async (res1) => {
            if (res1.confirm) {
              try {
                wx.showLoading({
                  title: '加载中',
                })
                const bind = await this.$http.post('/connection/add_admin', {
                  store_id: JSON.parse(res.result).store_id
                })
                wx.hideLoading()
                if (bind.code > 0) {
                  wx.showToast({
                    title: '绑定成功',
                    icon: 'none'
                  })
                } else {
                  wx.showToast({
                    title: bind.msg,
                    icon: 'none'
                  })
                }
                this.update()
              } catch (error) {

              }
            }

          }
        })
      }
    })
  }
  del(e) {
    console.warn(e);
    let item = e.currentTarget.dataset.item

    wx.showModal({
      title: '确认解绑此门店？',
      success: async (res) => {
        if (res.confirm) {
          wx.showLoading({
            title: '解绑中',
          })
          const del = await this.$http.post('/connection/del_connection', {
            store_id: item.store_id
          })
          wx.hideLoading()
          if (del.code > 0) {
            wx.showToast({
              title: '解绑成功',
              icon: 'none'
            })
          } else {
            wx.showToast({
              title: del.msg,
              icon: 'none'
            })
          }
          this.update()

        }
      }
    })
  }
  onPullDownRefresh() {
    this.update();
  }

}

origin(Page)