const origin = require('../../unity/origin/origin')
const computedBehavior = require('miniprogram-computed')


class Banner {
  behaviors = [computedBehavior]
  options = {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
  }
  properties = {
    title: String,
    state: String,
    totalPrice: String,
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