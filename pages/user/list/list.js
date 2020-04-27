const origin = require('../../../unity/origin/origin')
// const drawQrcode = require('weapp-qrcode')
class Page {
  /**
   * 声明data
   */
  data = {
    list: [{
      add_time: "2020-04-25 15:21:48",
      buy_num: 10,
      goods_id: "[7764,7765,7766]",
      id: 51,
      min: 10,
      name: "桶装水",
      price: "0.01",
      stock: 0,
      store_id: 28,
      head: "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK0n3ezUoE4kxjsEUALUw9hYuyUUiawQ0YPaibjtEopzb5Qc3MXhsrSCS1KNabmem7eZXFc1ibssV33A/132",
      name: "PerfectMan Sun",
      price: "0.10",
    }]
  }

  /**
   * 声明周期函数
   * 在onLoad后立即调用
   */
  async onStart() {
  }

  //调用接口
  async update() {
  }
  async submit() {
    console.warn(1);

  }

}

origin(Page)