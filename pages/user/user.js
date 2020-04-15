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
    info:{
      imageURL:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586957499534&di=3c0fd447b32828d8c0877c35f9c2c39e&imgtype=0&src=http%3A%2F%2Fimg000.hc360.cn%2Fm8%2FM01%2F04%2FE0%2FwKhQplVWs5OEaKF2AAAAAPUPHzk191.jpg",
      title:"集贤水站(平高世贸店)"
    }
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