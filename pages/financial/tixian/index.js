const origin = require('../../../unity/origin/origin')

class Page {
  /**
   * 声明data
   */
  data = {
    info: null,
    form: {
      money: 0,//多少钱
      store_id: '',
      money_type: 1,//提现方式
      account: "",//提现账号
      real_name: "",//提现姓名
    }
  }

  /**
   * 声明周期函数
   * 在onLoad后立即调用
   */
  async onStart() {
    this.data.form.store_id = wx.getStorageSync('store_id');
    this.update();
  }
  async update() {
    const res = await this.$http.post('/store/profile/info', {
      id: this.data.form.store_id
    });
    if (res.code >= 0) {
      let data = res.data;
      this.setData({ info: data });
    }
  }
  async httpTixian() {
    try {
      wx.showModal({
        title: '确定提现信息',
        content: `姓名：${this.data.form.real_name}\n提现账号：${this.data.form.account}\n提现金额：${this.data.form.money}`,
        success: async () => {
          const res = await this.$http.post('/budget/get_money', this.data.form);
          if (res.code > 0) {
            wx.showToast({
              title: '提现成功',
              icon: 'none'
            })
            this.$route.go(-1);
          } else {
            wx.showToast({
              title: res.msg,
              icon: 'none'
            })
          }
        }
      })
    } catch (error) {

    }
  }
  onChange(e) {
    this.setData({
      'form.money_type': e.detail
    })
  }


}

origin(Page)