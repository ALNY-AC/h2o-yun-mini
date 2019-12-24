const origin = require('../../unity/origin/origin')
const computedBehavior = require('miniprogram-computed')

class Page {
  behaviors = [computedBehavior]
  options = {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
  }
  properties = {
    title: String,
    model: {
      type: String,
      value: 'model'
    },
    titleSize: {
      type: String,
      value: '32rpx'
    }
  }
}

origin(Page);