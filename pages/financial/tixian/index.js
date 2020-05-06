const origin = require('../../../unity/origin/origin')
const computedBehavior = require('miniprogram-computed')

class Page {
  behaviors = [computedBehavior]
  /**
   * 声明data
   */
  data = {
    info: null,
    form: {
      money: '',//多少钱
      store_id: '',
      money_type: 1,//提现方式
      account: "",//提现账号
      real_name: "",//提现姓名
    },
    feelu: ''
  }
  computed = {
    fee(data) {
      if (!data.feelu && !data.form.money) return ''
      return parseFloat(data.feelu) * data.form.money
    },
    btnState(data) {
      if (data.form.account && data.form.money && data.form.real_name) return false
      return true
    }
  }

  /**
   * 声明周期函数
   * 在onLoad后立即调用
   */
  async onStart() {
    this.data.form.store_id = wx.getStorageSync('store_id');
    this.update();
    this.http_fee()
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
        cancelText: '重新编辑',
        success: async (res) => {
          if (res.confirm) {
            const res = await this.$http.post('/budget/get_money', this.data.form);
            if (res.code > 0) {
              wx.showModal({
                title: '申请成功',
                showCancel: false,
                success: (res) => {
                  this.$router.go(-1);
                }
              })

            } else {
              wx.showModal({
                title: '申请失败',
                content: res.msg,
                showCancel: false,
                confirmText: '重试'
              })
            }
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
  async http_fee() {
    try {
      const res = await this.$http.post('/budget/store_profile', {
        store_id: wx.getStorageSync('store_id'),
      })
      if (res.code > 0) {
        this.setData({
          feelu: res.data.money_royalty
        })

      }
    } catch (error) {

    }
  }


}

origin(Page)