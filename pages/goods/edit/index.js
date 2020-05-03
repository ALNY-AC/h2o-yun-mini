const origin = require('../../../unity/origin/origin')
const Upload = require('../../../unity/origin/Upload')
const File = require('../../../unity/origin/File')
const computedBehavior = require('miniprogram-computed')

class Page {
  behaviors = [computedBehavior]

  /**
   * 声明data
   */
  data = {
    form: {
      title: "",
      price: '',
      store_id: '',
      sort: '',
      class_id: '',
      goods_head: '',
      stock: '',
      is_up: 0,
    },
    show1: false,
    classList: [],
    is_up: false,
    index: 0,
    goods_head: ''
  }
  computed = {

    className(data) {
      if (data.form.class_id) {
        let el = data.classList.find(e => e.id == data.form.class_id);
        if (el) {
          return el.name;
        } else {
          return '请选择'
        }
      } else {
        return '请选择'
      }
    },
    defaultIndex(data) {
      if (data.form.class_id) {
        let index = data.classList.findIndex(e => e.id == data.form.class_id);
        return index;
      } else {
        return 0
      }
    },
  }
  /**
   * 声明周期函数
   * 在onLoad后立即调用
   */
  async onStart() {
    this.data.form.store_id = wx.getStorageSync('store_id');
    if (this.$route.query.id) {
      const res = await this.$http.post('/goods/info', {
        id: this.$route.query.id
      });
      if (res.code >= 0) {
        this.setData({
          form: res.data,
          goods_head: this.$getUrl(res.data.goods_head),
          is_up: res.data.is_up === 1 ? true : false
        });
      }
    }

  }
  onShow() {
    this.httpClass();
  }
  async httpClass() {
    const res = await this.$http.post('/class/list', {
      store_id: wx.getStorageSync('store_id')
    });
    if (res.code > 0) {
      if (res.data.list.length > 0) {
        this.setData({
          classList: res.data.list
        });
      } else {
        wx.showModal({
          title: '请先创建分类',
          showCancel: false,
          success: () => {
            this.$router.push('/pages/class/edit/index')
          }
        })
      }
    }
  }

  onChange(e) {
    this.setData({
      'form.is_up': e.detail
    })
  }
  async save() {
    if (this.data.form.goods_head == "") {
      this.$toast('请添加商品图片');
      return false;
    }
    if (this.data.form.title.replace(/(^\s*)|(\s*$)/g, "") == '') {
      this.$toast('请输入商品标题');
      return false;
    }
    if (this.data.form.price == 0) {
      this.$toast('价格不得为0');
      return false;
    }

    if (this.data.form.stock == 0) {
      this.$toast('库存不得为0');
      return false;
    }
    if (this.data.form.class_id == "" || typeof this.data.form.class_id == 'undefined') {
      this.$toast('请选择商品分类');
      return false;
    }
    const res = await this.$http.post('/goods/save', this.data.form);
    if (res.code >= 0) {
      this.$toast('保存成功');
      this.$router.go(-1);
    } else {
      this.$toast(res.msg);
    }
  }

  onConfirm(e) {

  }



  async upload() {


    let upload = new Upload(new File());

    const res = await upload.push();
    wx.showLoading({
      title: "上传中",
      mask: true
    })
    setTimeout(() => {
      wx.hideLoading();
      this.setData({
        ['form.goods_head']: res,
        goods_head: this.$getUrl(res),
      });
    }, 2000)



  }


}

origin(Page)