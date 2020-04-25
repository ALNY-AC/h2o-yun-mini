const origin = require('../../../unity/origin/origin')

class Page {
  /**
   * 声明data
   */
  data = {
    info:null,
    form:{
      money:0,//多少钱
      store_id:'',
      money_type:1,//提现方式
      account:"32",//提现账号
      real_name:"1",//提现姓名
    }
  }

  /**
   * 声明周期函数
   * 在onLoad后立即调用
   */
  async onStart() {
    this.data.form.store_id = wx.getStorageSync('store_id');
    this.update();
  }
  async update(){
    const res = await this.$http.post('/store/profile/info', {
      id:this.data.form.store_id
    });
    if(res.code>=0){
      let data = res.data;
      this.setData({ info: data });
    }
  }
  async httpTixian(){
    const res = await this.$http.post('/budget/get_money',this.data.form);
    if(res.code>=0){
      this.$toast('操作成功');
      this.$route.go(-1);
    }else{
      this.$tosat(res.msg);
    }
  }


}

origin(Page)