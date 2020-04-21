const origin = require('../../../unity/origin/origin')
const Upload = require('../../../unity/origin/Upload')
const File = require('../../../unity/origin/File')
const computedBehavior = require('miniprogram-computed')
const Url = require('../../../unity/origin/Url')


class Page {
  behaviors = [computedBehavior]
  /**
   * 声明data
   */
  data = {
    form: {
      name: "",//名称
      y: "",//经度
      x: "",//纬度
      info: "",//描述
      logo: "",//图片
      contacts: "",//联系方式
      phone: '',//手机号
      qq: ""//QQ号
    },
    host: Url.imageUrl,
    id: ''
  }
  computed = {
    logo(data) {
      return data.host + data.form.logo;
    }
  }
  code = null;
  userInfo = null;
  /**
   * 声明周期函数
   * 在onLoad后立即调用
   */
  async onStart() {
    if (this.$route.query.id) {

      this.setData({
        id: this.$route.query.id
      });

      const res = await this.$http.post('/store/info', {
        id: this.data.id
      });
      if (res.code >= 0) {
        this.setData({
          form: res.data
        })
      }
    } else {
      this.setData({ ['form.phone']: wx.getStorageSync('userInfo').phone });
    }

  }
  async save() {
    const res = await this.$http.post('/store/save', this.data.form);

    if (res.code >= 0) {
      this.$toast('保存成功');
      wx.setStorageSync('store', this.data.form);
      // wx.setStorageSync('store_id', data.id);
      this.$router.go(-1);
    } else {
      this.$toast(res.msg);
    }
  }

  async upload() {
    let upload = new Upload(new File());
    const res = await upload.push();
    console.warn(res);
    this.setData({ ['form.logo']: res });
  }

}

origin(Page)