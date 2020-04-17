const origin = require('../../../unity/origin/origin')

class Page {
  /**
   * 声明data
   */
  data = {
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
   const res = await this.$http.post('/class/list',{});
   if(res.code>=0){
    this.setData({
      list:res.data
    })
   }
      
    

  }
 

}

origin(Page)