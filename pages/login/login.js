const origin = require('../../unity/origin/origin')

class Page {
  /**
   * 声明data
   */
  data = {
    msg: '',
    userInfo: null,
  }
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

    // this.$router.push('/index/index', { a: 1, b: 2 });

    // console.warn(this.$route.query);

    // const res = await this.$http.post('/panel/packet', { item_id: 5 });
    // // console.warn('最后请求的数据：', res);

  }

  getUserInfo(e) {
    this.setData({ userInfo: e.detail.userInfo });
    console.warn(e.detail);
  }

}

origin(Page)