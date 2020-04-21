const origin = require('../../../unity/origin/origin')

class Page {
  /**
   * 声明data
   */
  data = {
    form: {
      title: "",
      price: 0,
      store_id: 2,
      sort: 0,
      class_id: ''
    },
    show: false,
    goodsNmae: '',
    classList: []
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
    },

  }
  /**
   * 声明周期函数
   * 在onLoad后立即调用
   */
  async onStart() {
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
      goodsNmae: e.detail.value.name,
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

}

origin(Page)