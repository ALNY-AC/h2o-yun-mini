const origin = require('../../unity/origin/origin')

class Page {
  /**
   * 声明data
   */
  data = {
    id: '',
    pwd: ''
  }

  /**
   * 声明周期函数
   * 在onLoad后立即调用
   */
  onStart() {
    let key = 'id2';

    console.warn({
        id: '1',
        type: 'text',
        [key]: 1
      });


  }

  async submit() {
    const res = await this.$http.post('/auth/pwd/login', {
      id: this.data.id,
      pwd: this.data.pwd
    });
    if (res.code >= 0) {
      wx.switchTab({
        url: '/pages/order/unOrder/index'
      });
    } else {
      this.$toast(res.msg);
    }
  }


}

origin(Page)