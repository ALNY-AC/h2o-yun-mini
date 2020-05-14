const origin = require('../../unity/origin/origin')
const computedBehavior = require('miniprogram-computed')

/**
 * 页面类
 */
class Page {
  behaviors = [computedBehavior]
  data = {
    msg: '',
    height: '',
    userInfo: null,
    store_user: '',
    info: {
      imageURL: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586959101945&di=32abe40e797263ba2759dd62db50f059&imgtype=0&src=http%3A%2F%2Ffile.youboy.com%2Fa%2F94%2F48%2F26%2F7%2F772677s.jpg",
      title: "集贤水站(平高世贸店)"
    }
  }
  async onStart() {

    if (wx.getStorageSync('jwt')) {
      // this.setData({
      //   userInfo: wx.getStorageSync('wx_userInfo')
      // })
      this.update()
    }
  }
  onShow() {
    this.setData({
      // userInfo: this.data.$app.userInfo,
      store_user: wx.getStorageSync('store').user_id
    })

  }

  async update() {
    const res = await this.$http.post('/user/info', {})
    if (res.code > 0) {
      this.setData({
        userInfo: res.data
      })
    }

  }
  reLogin() {
    wx.clearStorageSync();
    wx.reLaunch({
      url: '/pages/login/login'
    })
  }

  onPageScroll({
    scrollTop
  }) { }
  quit() {
    wx.loadFontFace({
      family: 'Bitstream Vera Serif Bold',
      source: 'url("https://sungd.github.io/Pacifico.ttf")',
      success: console.log
    })
  }


}

origin(Page);