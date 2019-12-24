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
  }
  onStart() {

    if (wx.getStorageSync('jwt')) {
      this.setData({
        userInfo: wx.getStorageSync('wx_userInfo')
      })
    }
  

  }
  onShow() {
    this.setData({
      userInfo: this.data.$app.userInfo
    })

  }

  update() {

  }

  onPageScroll({
    scrollTop
  }) {}
  quit() {
    wx.loadFontFace({
      family: 'Bitstream Vera Serif Bold',
      source: 'url("https://sungd.github.io/Pacifico.ttf")',
      success: console.log
    })
  }


}

origin(Page);