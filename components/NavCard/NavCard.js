// components/navTool/NavTool.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    'o-router'(e) {
      let url = e.currentTarget.dataset.url;
      wx.navigateTo({ url: url });
    },
    goOrder(e) {
      wx.switchTab({
        url:'/pages/order/order/index'
      })
    }
  }
})
