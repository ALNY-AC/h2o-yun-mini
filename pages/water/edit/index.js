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
      price:0,
      store_id:"",
      stock:-1,
      min:-1,
      goods_id: []
    },
    count: 0
  }
  computed = {
    goodsName(data) {
      return `已选择${data.form.goods_id.length}个商品`;
    },
  }

  onShow() {
    this.setData({
      count: ++this.data.count,
    });
    if (this.data.count > 1) {
      let list = [];
      if (wx.getStorageSync('goodsSelectList')) {
        list = wx.getStorageSync('goodsSelectList')
      }
      this.setData({
        ['form.goods_id']: list,
      });
    }

  }
  /**
   * 声明周期函数
   * 在onLoad后立即调用
   */
  async onStart() {

    this.setData({
      "form.store_id": wx.getStorageSync('store_id')
    });
    if (this.$route.query.id) {
      const res = await this.$http.post('/water_coupon/info', {
        id: this.$route.query.id
      });
      if (res.code >= 0) {
        this.setData({
          form: res.data,
        });
        wx.setStorageSync('goodsSelectList', res.data.goods_id);
      }
    }
  }
  async save() {
    if(this.data.form.name.replace(/(^\s*)|(\s*$)/g,"")==''){
      this.$toast('请输入水票标题');
      return false;
    }
    if(this.data.form.stock==0){
      this.$toast('库存不得为0');
      return false;
    }
    if(this.data.form.price==0){
      this.$toast('价格不得为0');
      return false;
    }
    if(this.data.form.min==0){
      this.$toast('起购数量不得为0');
      return false;
    }
    const res = await this.$http.post('/water_coupon/save', this.data.form);
    wx.setStorageSync('goodsSelectList', []);
    if (res.code >= 0) {
      this.$toast('保存成功');
      this.$router.go(-1);
    } else {
      this.$toast(res.msg);
    }
  }

}

origin(Page)