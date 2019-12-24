const origin = require('../../unity/origin/origin')
const computedBehavior = require('miniprogram-computed')

class Page {
  behaviors = [computedBehavior]
  data = {
  }
  computed = {}
  watch = {}
  async onStart() { }
  async update() { }
}

origin(Page)
