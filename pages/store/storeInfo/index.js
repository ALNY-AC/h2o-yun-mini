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
      name: "", //名称
      y: "", //经度
      x: "", //纬度
      info: "", //描述
      logo: "", //图片
      contacts: "", //联系方式
      phone: '', //手机号
      qq: "", //QQ号
      address_wx: '',
      address: '',
    },
    id: '',
    address: null
  }
  computed = {}
  code = null;
  userInfo = null;
  /**
   * 声明周期函数
   * 在onLoad后立即调用
   */
  async onStart() {
    console.warn('store edit');

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
      this.setData({
        ['form.phone']: wx.getStorageSync('userInfo').phone
      });
      wx.showModal({
        title: '请设置您店铺的地址～',
        showCancel: false,
        complete: () => {
          this.httpAddress();
        }
      })
    }

  }
  async save() {
    try {
      const res = await this.$http.post('/store/save', this.data.form);
      if (res.code >= 0) {
        this.$toast('保存成功');
        wx.setStorageSync('store', this.data.form);
        wx.setStorageSync('store_id', res.data);
        if (getCurrentPages().length > 1) {
          this.$router.go(-1);
        } else {
          wx.reLaunch({
            url: '/pages/home/index'
          });
        }

      } else {
        this.$toast(res.msg);
      }
    } catch (error) {
      this.$toast('保存失败！请重试');
    }


  }

  async upload() {
    let upload = new Upload(new File());
    const res = await upload.push();
    wx.showLoading({
      title: "上传中"
    })
    setTimeout(() => {
      wx.hideLoading();
      this.setData({
        ['form.logo']: res
      });
    }, 2000)


  }
  async httpAddress() {
    wx.chooseLocation({
      success: (res) => {
        this.setData({
          ['form.address_wx']: res.address + res.name,
          ['form.x']: res.latitude,
          ['form.y']: res.longitude,
        })
      },
      fail: (e) => {
        if (!this.data.form.x || !this.data.form.x) {
          wx.showModal({
            title: '请选择地址',
            showCancel: false,
            complete: () => {
              this.httpAddress();
            }
          })
        }
      }
    })
  }

}

origin(Page)