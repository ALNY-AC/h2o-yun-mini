const origin = require('../../unity/origin/origin')
const computedBehavior = require('miniprogram-computed')


class Banner {
  behaviors = [computedBehavior]

  properties = {
    indicatorDots: {
      type: Boolean,
      value: true
    },
    vertical: {
      type: Boolean,
      value: false
    },
    autoplay: {
      type: Boolean,
      value: true
    },
    interval: {
      type: Number,
      value: 3000
    },
    radius: {
      type: String,
      value: ''
    },
    list: {
      type: Array,
      value: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    }
  }
  computed = {
    style(data) {
      let style = [];
      if (data.radius) {
        style.push(`border-radius:${data.radius}`);
      }
      return style.join(';');
    }
  }
  data = {

  }
  onStart() {
    console.warn('Banner');
  }
}

origin(Banner)