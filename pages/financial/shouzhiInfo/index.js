const origin = require('../../../unity/origin/origin')

class Page {
  /**
   * 声明data
   */
  data = {
    info: {
    },
  }
  id = '';
  /**
   * 声明周期函数
   * 在onLoad后立即调用
   */
  async onStart() {
  
    this.update();
  }
  async update() {
    const res = await this.$http.post('/budget/info', {
      id: this.$route.query.id
    });
    let data = res.data;
    this.setData({ info: data })
  }


}

origin(Page)