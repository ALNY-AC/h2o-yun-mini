const origin = require('../../../unity/origin/origin')
const computedBehavior = require('miniprogram-computed')
const amapFile = require('../../../unity/origin/lib/amap-wx')
const myAmapFun = new amapFile.AMapWX({
  key: '3bf281c848c98e8400915e11cf21a14b'
});
class Page {
  behaviors = [computedBehavior]
  data = {
    info: null,
    locationx: "",
    locationy: "",
    CurrentAddress: "",
    markers: [{
        iconPath: "https://cube.elemecdn.com/e/62/2b480ebfaf27f250d77879c51c47djpeg.jpeg?x-oss-process=image/resize,m_lfit,w_377,h_377/watermark,g_se,x_4,y_4,image_YS8xYS82OGRlYzVjYTE0YjU1ZjJlZmFhYmIxMjM4Y2ZkZXBuZy5wbmc_eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsUF8yOA%3D%3D/quality,q_90/format,webp",
        id: 0,
        latitude: "",
        longitude: "",
        width: 30,
        height: 30
      },
      {
        iconPath: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3738963772,1223532166&fm=26&gp=0.jpg",
        id: 0,
        latitude: "",
        longitude: "",
        width: 30,
        height: 30
      },
    ],
  }
  computed = {
    totalPrice(data) {
      if (!data.info) return;
      let total = data.info.snapshotInfo.map(el => el.data.price * el.data.quantity).reduce((total, el) => total + el, 0);
      return (total + parseFloat(data.info.freight_price)).toFixed(2);
    },
    addressUser(data) {
      if (!data.info) return '';
      return `${data.info.addressInfo.contacts}(${data.info.addressInfo.gender == '1' ? '先生' : '女士'}) ${data.info.addressInfo.phone}`
    }
  }
  onStart() {
    this.update();
  }
  // onUnload() {
  //   wx.switchTab({
  //     url: '/pages/order/order'
  //   })
  // }
  async payment() {
    const payInfo = await this.$http.post('/order/getMini', {
      pay_id: this.data.info.pay_id
    });
    wx.requestPayment({
      timeStamp: payInfo.data['timestamp'],
      nonceStr: payInfo.data['nonceStr'],
      package: payInfo.data['package'],
      signType: payInfo.data['signType'],
      paySign: payInfo.data['paySign'],
      success: (res) => {
        wx.showModal({
          title: '成功',
          content: '支付成功',
          showCancel: false,
          success: (res) => {
            this.update();
          }
        })
      },
      fail: (res) => {
        console.warn(res);
        this.update();
      }
    });
  }
  async update() {
    const res = await this.$http.post('/order/info', {
      order_id: this.$route.query.order_id
    });
    if (res.code >= 0) {
      this.setData({
        info: res.data

      });
    }
    const res1 = await this.$http.post('/store/info', {
      id:  wx.getStorageSync('store_id')
    });
    if (res1.code >= 0) {
      this.setData({
        'markers[0].latitude': res1.data.x,
        'markers[0].longitude': res1.data.y,
      })

    }
    myAmapFun.getRegeo({
      success: (res) => {
        this.setData({
          CurrentAddress: res[0].regeocodeData,

          locationx: `${res[0].longitude}`,
          locationy: `${res[0].latitude}`
        })

      }
    })
    // myAmapFun.getPoiAround({
    //   success:(data)=>{
    //     //成功回调
    //   },

    // })
    if (res.data.state == 3) {
      setInterval(() => {
        this.dadaLocation()
      }, 5000)

    }


  }
  async http_Close(){
    const res = await this.$http.post('/order/close_order', {
      order_id: this.$route.query.order_id
    });
    if (res.code >= 0) {
      
    }
  
  }
  dadaLocation() {
    this.setData({
      // 'markers[1].latitude':res[0].result.transporterLat,
      // 'markers[1].longitude':res[0].result.transporterLng,
      'markers[1].latitude': "31.01000",
      'markers[1].longitude': "121.24000",
    })
  }
}

origin(Page);