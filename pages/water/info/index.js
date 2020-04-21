const origin = require('../../../unity/origin/origin')

class Page {
  /**
   * 声明data
   */
  data = {
    info: null
  }

  /**
   * 声明周期函数
   * 在onLoad后立即调用
   */
  async onStart() {
    this.update();
  }

  //调用接口
  async update() {
    const res = await this.$http.post('/water_coupon/info', {
      id: this.$route.query.id
    });
    if (res.code >= 0) {
      this.setData({
        info: res.data
      })

    }

  }
  del(e) {
    console.log(this.data.info.id)
    wx.showModal({
      title: '提示',
      content: '确定删除吗',
      success: async (res) => {
        if (res.confirm) {
          const res1 = await this.$http.post('/water_coupon/del', {
            id:this.data.info.id,
            store_id:wx.getStorageSync('store_id')
          });
          if (res1.code >= 0) {
            this.$toast('删除成功');
            this.$router.go(-1)
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