const origin = require('../../unity/origin/origin')
const computedBehavior = require('miniprogram-computed')
const amapFile = require('../../unity/origin/lib/amap-wx')
const myAmapFun = new amapFile.AMapWX({ key: '3bf281c848c98e8400915e11cf21a14b' });
class Page {
  behaviors = [computedBehavior]
  data = {
    list: [],
    page: 1,
    total: 1,
    x: '',
    y: ''
  }
 async onStart() {
    this.getsite()

  }
  async initUpdate() {
    await this.setData({
      page: 1,
      // list: [],
      total: 0
    });
    this.update();
  }
  async update() {
    try {
      const res = await this.$http.post('/store/list', {});
      if (res.code <= 0) return;
      let list = res.data.map(el => {
       
        el.distance = this.distance(this.data.x, this.data.y, el.x, el.y)
        return el
      })
      this.setData({ list: list });
      wx.stopPullDownRefresh();
    } catch (error) { }
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
  getsite() {
    myAmapFun.getRegeo({
      success: (res) => {
        this.setData({
          x: res[0].latitude,
          y: res[0].longitude
        })
        this.update();
      }
    })
  }
  distance(la1, lo1, la2, lo2) {
    var La1 = la1 * Math.PI / 180.0;
    var La2 = la2 * Math.PI / 180.0;
    var La3 = La1 - La2;
    var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
    s = s * 6378.137; 
    s = Math.round(s * 10000) / 10000;
    s = s.toFixed(2);
    return s;
  }
}

origin(Page)
