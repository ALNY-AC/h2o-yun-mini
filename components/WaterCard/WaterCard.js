// components/WaterCard/WaterCard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    info: { // 属性名
      type: Object,
      value: null
    },
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
    go(e) {
      if (typeof e.currentTarget.dataset.url != 'undefined') {
        wx.navigateTo({
          url: e.currentTarget.dataset.url
        });
      }

    }
  }
})
