const origin = require('../../unity/origin/origin')



/**
 * 页面类
 */
class Page {
  data = {
    msg: 'Hello',
    msg2: '',
    array: [
      { text: 'Vue', value: 0, },
      { text: 'React', value: 1, },
      { text: 'Angular', value: 2, },
    ],
    index: 0,
  }
  /**
   * 启动函数
   */
  async onStart() {
  }

}

origin(Page);