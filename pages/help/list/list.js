const origin = require('../../../unity/origin/origin')
const computedBehavior = require('miniprogram-computed')

class Page {
  behaviors = [computedBehavior]
  data = {
    activeNames: []
  }
  computed = {}
  watch = {}
  async onStart() { }
  async update() { }
  change(e) {
    this.setData({
      activeNames: e.detail
    })
  }
}

origin(Page)
