const Url = require('./unity/origin/Url')

//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    // 登录
    if (wx.getStorageSync('userInfo')) {
      this.globalData.userInfo = wx.getStorageSync('userInfo');
    } else {
      this.globalData.userInfo = null;
    }

    if (!wx.getStorageSync('jwt')) {
      wx.reLaunch({
        url: '/pages/login/login'
      });
      return;
    }

    if (!wx.getStorageSync('store') || !wx.getStorageSync('store_id')) {

      wx.reLaunch({
        url: '/pages/store/selectStore/index'
      })
    }

    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  onShow() {
    if (!wx.getStorageSync('jwt')) {
      wx.reLaunch({
        url: '/pages/login/login'
      });
      return;
    }
    if (!wx.getStorageSync('store') || !wx.getStorageSync('store_id')) {
      this.goSelectStore();
    }
  },
  goSelectStore() {
    let pages = getCurrentPages();
    if (pages.length > 0) {
      pages = pages[pages.length - 1];
      if (pages.route.indexOf('store') < 0) {
        wx.reLaunch({
          url: '/pages/store/selectStore/index'
        })
      }
    }

  },
  globalData: {
    userInfo: null,
    url: Url,
  }
})