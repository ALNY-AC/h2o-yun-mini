const origin = require('../../unity/origin/origin')
const computedBehavior = require('miniprogram-computed')


/**
 * 页面类
 */
class Page {
  behaviors = [computedBehavior]
  data = {
    classActive: 0,
    outMod: 0,
    classList: [
      { id: 1, name: '企业专送' },
      { id: 2, name: '门面专送' },
      { id: 3, name: '居家专送' },
    ],
    banners: [
      '/assets/images/banner1.jpg',
      '/assets/images/banner2.jpg',
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