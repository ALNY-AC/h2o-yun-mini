const origin = require('../../../unity/origin/origin')

class Page {
  /**
   * 声明data
   */
  data = {
    date: '2016-09-01',
  }

  /**
   * 声明周期函数
   * 在onLoad后立即调用
   */
  async onStart() {
    
  }
  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  }


}

origin(Page)