const origin = require('../../../unity/origin/origin')

const computedBehavior = require('miniprogram-computed')

class Page {
  behaviors = [computedBehavior]

  /**
   * 声明data
   */
  data = {
    form: {
      name: "",
      price: '',
      store_id: '',
      stock: '',
      max: '',
      min: '',
      goods_id: []
    },
    show: false,

  }
  computed = {
    goodsName(data) {
      return `已选择${data.form.goods_id.selectList.length}个商品`;
    },

  }

  onShow() {
    let list = [];
    if (wx.getStorageSync('goodsSelectList')) {
      list = wx.getStorageSync('goodsSelectList')
    }
    this.setData({
      ['form.goods_id']: list,
    });
  }
  /**
   * 声明周期函数
   * 在onLoad后立即调用
   */
  async onStart() {
    this.data.form.store_id = wx.getStorageSync('store_id');
    if (this.$route.query.id) {
      const res = await this.$http.post('/water_coupon/info', {
        id: this.$route.query.id
      });
      if (res.code >= 0) {
        this.setData({
          form: res.data
        });
      }
    }
    this.httpGood();
  }
  async httpGood() {
    const res = await this.$http.post('/goods/list', {
      store_id: wx.getStorageSync('store_id')
    });
    if (res.code >= 0) {
      this.setData({
        goodsList: res.data.list
      });
    }
  }

  async save() {

    const res = await this.$http.post('/water_coupon/save', this.data.form);
    if (res.code >= 0) {
      this.$toast('保存成功');
      this.$router.go(-1);
    } else {
      this.$toast(res.msg);
    }
  }
  showPopup() {
    this.setData({
      show: true
    })
  }
  onConfirm(e) {

  }
  onCancel() {
    this.setData({
      show: false
    })
  }
  onClose() {
    this.setData({
      show: false
    })
  }




}

origin(Page)