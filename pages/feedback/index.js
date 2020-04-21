const origin = require('../../unity/origin/origin')

class Page {
  data = {
    content: '',
  }
  /**
   * 监听data数据变化
   */

  /**
   * 声明周期函数
   * 在onLoad后立即调用
   */
  onStart() {

  }

  async submit() {
    try {
      const res = await this.$http.post('/feedback/save', {
        content: this.data.content
      });
      wx.showModal({
        title: '成功',
        content: '您的反馈我们已经收到！我们会尽快处理。',
        showCancel: false,
        success: () => {
          this.$router.go(-1);
        },
        fail: () => {
          this.$router.go(-1);
        }
      })
    } catch (error) {

    }



  }

}

origin(Page)