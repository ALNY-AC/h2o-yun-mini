const origin = require('../../unity/origin/origin')
const computedBehavior = require('miniprogram-computed')


/**
 * 页面类
 */
class Page {
  behaviors = [computedBehavior]
  data = {
    list: [
      '1',
      '2',
      '3',
    ],
    outMod: 0,
    count: 1,
  }
  computed = {
    counts(data) {

      let count = data.count;
      let arr = [];
      let tot = 1;
      let newItem = [];

      for (let i = 0; i < count; i++) {

        if (i % 5 == 0) {
          newItem = [];
          arr.push(newItem);
          tot += 1;
        }
        newItem.push(i + '' + tot);

      }
      return arr;
    }
  }
  watch = {
    count() {
      wx.createSelectorQuery().select('#j_page').boundingClientRect(function (rect) {
        // 使页面滚动到底部
        wx.pageScrollTo({
          scrollTop: rect.height
        })
      }).exec()
    }
  }

  /**
   * 启动函数
   */
  async onStart() {
  }
  async update() {

  }

}

origin(Page);