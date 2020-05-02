const origin = require('../../unity/origin/origin')

class Page {
  /**
   * 声明data
   */
  data = {
    account: '',
    password: ''
  }

  /**
   * 声明周期函数
   * 在onLoad后立即调用
   */
  onStart() {
  }

  async submit() {

    const res = await this.$http.post('/auth/pwd/login', {
      account: this.data.account,
      password: this.data.password
    });
    console.warn(res);

    wx.setStorageSync('jwt', res.jwt);
    wx.setStorageSync('userInfo', res.userInfo);

    if (res.code >= 0) {
      this.$toast('登陆成功～');
      wx.reLaunch({
        url: '/pages/store/selectStore/index'
      })
    } else {
      this.$toast('登陆失败，请检查账户或密码！');
    }
  }


}

origin(Page)