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
        word:'分类管理',
        url:'',
        icon:'photo-o',
      }, {
        word: '商品管理',
        url: '',
        icon: 'photo-o',
      }, {
        word: '水票管理',
        url: '',
        icon: 'photo-o',
      }, {
        word: '订单管理',
        url: '',
        icon: 'photo-o',
      }, {
        word: '服务配置',
        url: '',
        icon: 'photo-o',
      }, {
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
  submit() {

  }
}

origin(Page);