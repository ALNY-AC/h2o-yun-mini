// components/WaterCard/WaterCard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    info: { // 数据
      type: Object,
      value: null
    },
    rb: { //圆的背景颜色
      type: String,
      value: '#f6f6f6'
    },
    showQr: { //圆的背景颜色
      type: Boolean,
      value: true
    },
    routerInfo: {
      type: Boolean,
      value: true
    },
    routerQr: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    number: 0
  },
  attached() {
    let number = Math.ceil((wx.getSystemInfoSync().windowWidth - 40) / 21);
    this.setData({
      number: number
    });
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goInfo(e) {
      if (this.data.routerInfo) {
        wx.navigateTo({
          url: `/pages/water/info/index?id=${this.data.info.id}`
        });
      }
    },
    goQr() {
      if (this.data.routerQr) {
        wx.navigateTo({
          url: `/pages/water/qr/index?id=${this.data.info.id}`
        });
      }
    }
  }
})
