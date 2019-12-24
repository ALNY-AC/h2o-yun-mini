const origin = require('../../unity/origin/origin')
const computedBehavior = require('miniprogram-computed')

class ImgTextCard {
  behaviors = [computedBehavior]
  options = {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
  }
  properties = {
    src: String,
    model: {
      type: String,
      value: 'x'
    },
    imgSize: {
      type: Array,
      value: ['280rpx', '280rpx']
    },
    title: String,
    infos: {
      type: Array,
      value: []
    },
    shadow: {
      type: Boolean,
      value: false
    },
    imgUrl: String,
    marginB: String,
    className: String,
    radius: {
      type: String,
      value: '5px'
    },
    bg: {
      type: String,
      default: "#fff"
    },
    rightSlot: {
      type: Boolean,
      value: true
    }
  }
  computed = {
    style(data) {
      let style = [];
      if (data.shadow) {
        style.push('box-shadow: 2px 0 20px rgba(0,0,0,0.1)');
      }
      if (data.marginB) {
        style.push(`margin-bottom:${data.marginB} `);
      }
      if (data.radius) {
        style.push(`border-radius:${data.radius}`);
      }
      if (data.bg) {
        style.push(`background-color:${data.bg}`);
      }
      return style.join(';');
    }
  }
  data = {
  }
  onStart() {
    //
  }
}

origin(ImgTextCard);