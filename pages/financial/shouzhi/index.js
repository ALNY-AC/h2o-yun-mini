const origin = require('../../../unity/origin/origin')

class Page {
  /**
   * 声明data
   */
  data = {
    date: new Date().Format('yyyy-MM-dd'),
  }

  /**
   * 声明周期函数
   * 在onLoad后立即调用
   */
  async onStart() {

  }
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  }


}

origin(Page)