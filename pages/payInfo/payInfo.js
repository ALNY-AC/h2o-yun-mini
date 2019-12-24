// pages/order/order.js
const origin = require('../../unity/origin/origin')
const computedBehavior = require('miniprogram-computed')
class Page {
  behaviors = [computedBehavior]
  data = {
    list: [],
    address: [],
    deliveryPrice: 0,
    remarks: "",
    lei:1,
    coupons:null
  }
  computed = {
    total(data) {
      return data.list.map(el => el.select_value).reduce((total, el) => total + el, 0);
    },
    totalPrice(data) {
      let total = data.list.filter(el => el.select_value > 0).map(el => el.price * el.select_value).reduce((total, el) => total + el, 0);
      return total.toFixed(2);
    },
    addressinfo(data) {
      if (data.address.length <= 0) return false;
      const addressarr = data.address.filter(el => el.is_default == 1)
      if (addressarr.length > 0) return addressarr[0]
      return data.address[0]
    }
  }
  watch = {

  }
  onStart() {
    let select = wx.getStorageSync('select');
    // select = select.forEach(el=>{
    //     console.log(el)
    // });
    this.setData({ list: select });
    this.update()
  }
  async update() {
    try {
      const res = await this.$http.post('/address/list', {});
      if (res.code <= 0) return;
      this.setData({
        address: res.data
      })
    } catch (error) {

    }
  }
  async onShow() {
    let addressId = wx.getStorageSync('setAddress')

    if (!addressId) return;
    
    try {
      const res = await this.$http.post('/address/info', {
        id: addressId
      });
      if (res.code <= 0) return;
      this.setData({
        addressinfo: res.data
      })
    } catch (error) { }
  }
  Choice(e) {
    this.$router.push('/pages/address/select/select')
  }
  changeData() {
    const coupons = wx.getStorageSync("coupons")
    
    console.log(coupons)
    this.setData({
      lei:2,
      'coupons.price':coupons.price,
      'coupons.id':coupons.id
    })
  }
  async submit() {
    if (!this.data.addressinfo.id) {
      wx.showToast({
        title: "请填写收货地址",
        icon: "none"
      })
      return false
    }
    //提交订单设置缓存清空tabbar右上角数字

    let data = {
      store_id: this.$route.query.store_id,
      address_id: this.data.addressinfo.id,
      goods: this.data.list.map(el => ({ id: el.id, quantity: el.select_value, sku_id: '' })),
      buy_type: 'TAKE',
      remarks: this.data.remarks,
      // id:this.data.coupons.id,
      // price:this.data.coupons.price
    }
    const res = await this.$http.post('/order/create', data);
    wx.setStorageSync('order_ok', true);
    // wx.removeStorageSync('select')

    /**调用接口获取支付参数 */
    if(res.code>=0){
      const payInfo = await this.$http.post('/order/getMini', {
        pay_id: res.data.pay_id
      });
      const order_id = res.data.order_id
      wx.removeStorageSync('setAddress')
      wx.redirectTo({
        url: `/pages/order/orderInfo/orderInfo?order_id=${order_id}`
      })
    }else{
        wx.showToast({
          title:"提交失败",
          icon:"none"
        })
    }
  
    // wx.requestPayment({
    //   timeStamp: payInfo.data['timestamp'],
    //   nonceStr: payInfo.data['nonceStr'],
    //   package: payInfo.data['package'],
    //   signType: payInfo.data['signType'],
    //   paySign: payInfo.data['paySign'],
    //   success: (res) => {
    //     wx.showModal({
    //       title: '成功',
    //       content: '支付成功',
    //       showCancel: false,
    //       success: (res) => {
    //         // this.$router.push('/pages/order/orderInfo/orderInfo', {
    //         //   order_id: order_id
    //         // })

    //       }
    //     })
    //   },
    //   fail: (res) => {
    //     console.log(res)
    //     wx.reLaunch({
    //       url: `/pages/order/orderInfo/orderInfo?order_id=${order_id}`
    //     })
    //   }
    // });


    return;
    wx.showToast({
      title: '支付成功',
      mask: true,
    });
    setTimeout(() => {
      wx.switchTab({
        url: '/pages/home/home'
      })
    }, 1000);
    //显示加载层
    /** 1、拿到预订单id*/
    // let preId = this.$http.post('/order/preId', select);
    /** 2、通过预订单id获取支付参数 */
    // let patData = this.$http.post('/order/payData', preId);
    /**3、调用支付接口 */
    // patData.success = () => { };
    // patData.fail = () => { };
    // wx.requestPayment(patData);
  }
}
origin(Page);