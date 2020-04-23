const origin = require('../../unity/origin/origin')
const computedBehavior = require('miniprogram-computed')
/**
 * 页面类
 */
class Page {
  behaviors = [computedBehavior]
  data = {
    tool:[
      {
        id:1,
        word:'分类管理',
        url:'/pages/class/list/index',
        icon:'bars',
      }, {
        id: 2,
        word: '商品管理',
        url: '/pages/goods/list/index',
        icon: 'shopping-cart-o',
      }, {
        id: 3,
        word: '水票管理',
        url: '/pages/water/list/index',
        icon: 'coupon-o',
      }, {
        id: 4,
        word: '订单管理',
        url: '/pages/order/order/index',
        icon: 'orders-o',
      }, {
        id: 5,
        word: '服务配置',
        url: '',
        icon: 'gem-o',
      }, {
        id: 6,
        word: '推广店铺',
        url: '',
        icon: 'photo-o',
      },
    ]
  }
  computed = {

  }
  watch = {
  }

  /**
   * 启动函数
   */
  async onStart() {
  }
  async update() {

  }
  go(e){
    if(e.currentTarget.dataset.ids=="4"){
      wx.switchTab({
        url: e.currentTarget.dataset.url
      })
    }else {
      wx.navigateTo({
        url: e.currentTarget.dataset.url,
      })
    }
  }
  submit() {

  }
}

origin(Page);