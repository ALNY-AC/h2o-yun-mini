// pages/map/map.js
const origin = require('../../unity/origin/origin')
const computedBehavior = require('miniprogram-computed')


/**
 * 页面类
 */
class Page {
  behaviors = [computedBehavior]
  data = {
    mapCtx: null,
    latitude: '',
    longitude: '',
    markers: [{
      iconPath: "../../assets/images/location.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }],
  }
  computed = {

  }
  watch = {
  }

  /**
   * 启动函数
   */
  async onStart() {
    this.setData({
      mapCtx: wx.createMapContext('map')
    })
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        console.warn(res);
        
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })

      }
    })
  }
  async update() {

  }
  regionchange() {
    this.data.mapCtx.getCenterLocation({
      success: (res) => {
        console.warn(res);
      }
    })


  }
  submit() {

  }
}

origin(Page);