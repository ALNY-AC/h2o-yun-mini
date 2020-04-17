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
      type: 'gcj02',
      success: (res) => {
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