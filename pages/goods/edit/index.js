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
      price: 0,
      store_id: '',
      sort: 0,
      class_id: '',
      goods_head: ''
    },
    show: false,
    classList: []
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
    }


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
          form: res.data
        });
      }
    }
    this.httpClass();
  }
  async httpClass() {
    const res = await this.$http.post('/class/list', {
      store_id: wx.getStorageSync('store_id')
    });
    if (res.code >= 0) {
      this.setData({
        classList: res.data.list
      });
    }
  }
  onChange(e) {
    this.setData({
      'form.is_up': e.detail
    })
  }
  async save() {
   
    const res = await this.$http.post('/goods/save', this.data.form);
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
    this.setData({
      'form.class_id': e.detail.value.id,
      show: false
    })
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

  async upload() {
    let upload = new Upload(new File());
    const res = await upload.push();
    this.setData({ ['form.goods_head']: res });
  }


}

origin(Page)