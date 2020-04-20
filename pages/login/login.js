const origin = require('../../unity/origin/origin')

class Page {
  /**
   * 声明data
   */
  data = {
    msg: '',
    userInfo: null,
  }

  code = null;
  userInfo = null;

  /**
   * 监听data数据变化
   */
  observers = {
    msg() {
      // console.warn('更改');
      // this.setData({
      // msg2: this.data.msg.split(' ')[1]
      // });
    }
  }
  /**
   * 声明周期函数
   * 在onLoad后立即调用
   */
  onStart() {

    wx.removeStorageSync('jwt');


    wx.login({
      success: (e) => {
        this.code = e.code;
      }
    });
    // this.$router.push('/index/index', { a: 1, b: 2 });

    // console.warn(this.$route.query);

    // const res = await this.$http.post('/panel/packet', { item_id: 5 });
    // // console.warn('最后请求的数据：', res);

  }

  async getUserInfo(e) {
    this.setData({
      userInfo: e.detail.userInfo
    });
    this.userInfo = e.detail;
  }

  async getPhoneNumber(e) {
    const res = await this.$http.post('/auth/login', {
      phone_info: e.detail,
      user_info: this.userInfo,
      code: this.code
    });
    wx.setStorageSync('jwt', res.jwt);
    wx.setStorageSync('userInfo', res.userInfo);

    if (res.storeCount <= 0) {
      wx.showModal({
        showCancel: false,
        title: '您还没有店铺，请先创建',
        success: (res) => {
          if (res.confirm) {
            wx.reLaunch({
              url: '/pages/store/storeInfo/index'
            })
          }
        }
      })
    } else {
      this.$router.push('/pages/store/selectStore/index');
      // wx.switchTab({
      //   url: '/pages/home/index'
      // });
    }

    // console.warn(res);

  }

}

origin(Page)