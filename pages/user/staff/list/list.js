const origin = require('../../../../unity/origin/origin')
const computedBehavior = require('miniprogram-computed')
class Page {
  behaviors = [computedBehavior]
  /**
   * 声明data
   */
  data = {
    list: [],
    query: {
      page: 1,
      page_size: 10,
      store_id: ''
    },
    total: 0,
    loading: false,
  }
  computed = {

  }
  watch = {
  }

  /**
   * 声明周期函数
   * 在onLoad后立即调用
   */
  async onStart() {
    this.setData({
      ['query.store_id']: wx.getStorageSync('store_id')
    })
    this.update()
  }
  async onShow() {

  }
  async update() {
    try {
      wx.showLoading({
        title: '加载中',
      })
      const res = await this.$http.post('/connection/list', this.data.query);
      if (res.code > 0) {
        this.setData({
          list: [...this.data.list, ...res.data.list],
          ['query.page']: ++this.data.query.page,
          loading: res.data.total > 0 ? false : true
        })
      } else {
        this.setData({
          loading: this.data.total > 0 ? false : true
        })
      }
      wx.hideLoading()
      wx.stopPullDownRefresh()
    } catch (error) {
    }
  }
  onClose(event) {
    const { position, instance } = event.detail;
    const staff = event.currentTarget.dataset.item

    switch (position) {
      case 'left':
      case 'cell':
        instance.close();
        break;
      case 'right':
        wx.showModal({
          title: '是否解除此员工',
          success: async (res) => {
            if (res.confirm) {
              try {
                wx.showLoading({
                  title: '解除中',
                })
                const result = await this.$http.post('/connection/del_connection', {
                  store_id: this.data.query.store_id,
                  user_id: staff.id
                })
                wx.hideLoading()

                if (result.code > 0) {
                  wx.showToast({
                    title: '解除成功',
                    icon: 'none'
                  })
                  this.updateInit()
                }
                instance.close();
              } catch (error) {

              }
            }
            if (res.cancel) {
              instance.close();
            }
          }
        })
        break;
    }
  }
  //下拉刷新
  onPullDownRefresh() {
    this.updateInit()
  }
  updateInit() {
    this.setData({
      list: [],
      ['query.page']: 1,
      loading: false
    })
    this.update()
  }
  onReachBottom() {
    this.update()
  }

}

origin(Page)