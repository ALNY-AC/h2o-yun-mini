const origin = require('../../../unity/origin/origin')

class Page {
  /**
   * 声明data
   */
  data = {

    form: {
      name: "",//名称
      y:"",//经度
      x:"",//纬度
      info:"",//描述
      logo:"",//图片
      contacts:"",//联系方式
      phone:"",//手机号
      QQ:""//QQ号
    }
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
    },

  }
  /**
   * 声明周期函数
   * 在onLoad后立即调用
   */
  async onStart() {
    if (this.$route.query.id) {
      const res = await this.$http.post('/store/info', this.data.form);
      if (res.code >= 0) {
        this.setData({
          form:res.data
        })
      }
    }

  }
  async save() {
    const res = await this.$http.post('/store/save', this.data.form);
    if (res.code >= 0) {
      this.$toast('保存成功');
      // wx.switchTab({
      //   url: '/pages/home/index'
      // });
    } else {
      this.$toast(res.msg);
    }
  }

}

origin(Page)