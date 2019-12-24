const origin = require('../../unity/origin/origin')
const computedBehavior = require('miniprogram-computed')
class Page {
  behaviors = [computedBehavior]
  data = {
    page: 1,
    list: [],
    total: 1,
    userInfo: null,

  }
  onStart() {
    if (this.data.isLogin) {
      this.initUpdate();
    } else {

    }
  }
  async onShow() {
    await this.setData({
      userInfo: this.data.$app.userInfo
    });
    if (this.data.userInfo) {
      if (this.data.list.length <= 0) {
        this.initUpdate();
      }
    } else {
      console.warn('未登录');

    }
  }
  async initUpdate() {

    await this.setData({
      page: 1,
      list: [], 
      total: 0
    });
    this.update();
  }
  async update() {
    wx.showLoading({
      title: '加载中',
    })
    const res = await this.$http.post('/order/list', {
      page_size: 5,
      page: this.data.page
    });

    if (res.code > 0) {
      // 有数据
      const list = res.data;

      list.forEach(el => {
        // 0 预订单
        // 1 待支付
        // 2 已支付
        // 3 已完成

        if (el.state == 0) {
          el.state_label = '待支付';
        }
        if (el.state == 1) {
          el.state_label = '商家已接单';
        }
        if (el.state == 2) {
          el.state_label = '待取货';
        }
        if (el.state == 3) {
          el.state_label = '配送中';
        }
        if (el.state == 4) {
          el.state_label = '已完成';
        }
        if (el.state == 5) {
          el.state_label = '订单取消';
        } 
        let infos = []
        infos.push("下单时间：" + el.add_time)

        var num = 0
        el.snapshotInfo.forEach(els => {
          num = num + els.data.quantity
        })

        infos.push(el.snapshotInfo[0].title + "..." + "等" + num + "件商品")

        infos.push("总价：￥" + (el.price*1+el.freight_price*1))
        // console.log(infos)
        el.infos = infos
      });


      this.setData({
        list: [...this.data.list, ...list],
        total: res.total,
        page: ++this.data.page,
      });
    } else {
      // 没有数据了
    }
    wx.hideLoading();
    wx.stopPullDownRefresh();

  }
  /**
   * 下拉事件
   */
  onPullDownRefresh() {
    this.initUpdate();
  }
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    this.update();
  }

  go(e) {
    const info = e.currentTarget.dataset.info
    this.$router.push(`/pages/order/orderInfo/orderInfo?order_id=${info.order_id}`);

  }



}
origin(Page);