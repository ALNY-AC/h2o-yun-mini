// pages/order/order.js
const origin = require('../../../unity/origin/origin')
const computedBehavior = require('miniprogram-computed')
const amapFile = require('../../../unity/origin/lib/amap-wx')
const areaList = require('../../../unity/origin/lib/area')
const myAmapFun = new amapFile.AMapWX({ key: '3bf281c848c98e8400915e11cf21a14b' });
class Page {
  behaviors = [computedBehavior]
  data = {
    keyword: '',
    show: false,
    areaList: areaList.default,
    Areaval: [],
    TipsArr: [],
    areaval: '',
    CurrentAddress: '',
    location: ''
  }

  computed = {
    addresstitle(data) {
      if (!data.CurrentAddress) return ''
      return data.CurrentAddress.addressComponent.province
    },
    areaval(data) {
      if (!data.CurrentAddress) return ''
      return data.CurrentAddress.addressComponent.adcode
    }
  }
  watch = {
    keyword(word) {
      this.Obtaintips()
    }
  }
  async onStart() {
    myAmapFun.getRegeo({
      success: (res) => {
        this.setData({
          CurrentAddress: res[0].regeocodeData,
          keyword: res[0].name,
          location: `${res[0].longitude},${res[0].latitude}`
        })

      }
    })
  }
  Obtaintips() {
    let vm = this
    myAmapFun.getInputtips({
      keywords: this.data.keyword,
      city: this.data.areaval,
      citylimit: true,
      location: this.data.location,
      success(data) {
        vm.setData({
          TipsArr: data.tips
        })
      }
    })
  }
  select() {
    this.setData({
      show: true
    })
  }
  selectaddress(e) {
    this.setData({
      show: false,
      areaval: e.detail.values[2].code,
      addresstitle: e.detail.values[1].name,
      Areaval: e.detail.values
    })
    this.Obtaintips()

  }
  canceladdress(e) {
    this.setData({
      show: false
    })
  }
  choice(e) {
    let el = e.currentTarget.dataset.item
    let location = el.location.split(',')
    let addressdata = {
      name: el.name,
      x: location[1],
      y: location[0],
      province: el.adcode.slice(0, 2) + '0000',
      city: el.adcode.slice(0, 4) + '00',
      region: el.adcode,
      num: el.district + el.address
    }
    if (this.data.Areaval.length > 0) {
      addressdata.province = this.data.Areaval[0].code
      addressdata.city = this.data.Areaval[1].code
      addressdata.region = this.data.Areaval[2].code
    }
    wx.setStorageSync('addressinfo', addressdata)
    this.$router.go(-1)
  }
}
origin(Page);