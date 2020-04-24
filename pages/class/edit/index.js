const origin = require('../../../unity/origin/origin')

class Page {
  /**
   * 声明data
   */
  data = {
    form: {
      name: "",
      is_up: 0,
      store_id:'',
    }
  }

  /**
   * 声明周期函数
   * 在onLoad后立即调用
   */
  async onStart() {
    if (this.$route.query.id) {
      const res = await this.$http.post('/class/info', {
        id: this.$route.query.id
      });
      if (res.code >= 0) {
        this.setData({
          form: res.data
        })
      }
    }else{
        this.setData({
          'form.store_id': wx.getStorageSync('store_id')
        });
    }
  }
  onChange(e) {
    this.setData({
      'form.is_up': e.detail
    })
  }
  async save() {
    if (this.data.form.name.replace(/(^\s*)|(\s*$)/g, "") == '') {
      this.$toast('请输入分类名称');
      return false;
    }
    const res = await this.$http.post('/class/save', this.data.form);
    if (res.code >= 0) {
      this.$toast('保存成功');
      this.$router.go(-1);
    } else {
      this.$toast(res.msg);
    }
  }

}

origin(Page)