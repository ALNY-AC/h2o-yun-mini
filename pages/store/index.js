const origin = require('../../unity/origin/origin')

class Page {
  /**
   * 声明data
   */
  data = {
    imageURL: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586957304625&di=00265dca96f1ac4236b3ba1208620fd4&imgtype=0&src=http%3A%2F%2Fimg009.hc360.cn%2Fg6%2FM07%2F5D%2FAB%2FwKhQsVNsW6aEP0DZAAAAAMqPSDE457.jpg',
    info: wx.getStorageSync('store'),
    id: wx.getStorageSync('store_id')
  }
  /**
   * 监听data数据变化
   */
  observers = {
  }
  /**
   * 声明周期函数
   * 在onLoad后立即调用
   */
  onStart() {
    this.update();
  }

  onShow() {
    this.setData({
      info: wx.getStorageSync('store'),
      id: wx.getStorageSync('store_id'),
    })
  }

  async update() {

    const res = await this.$http.post('/store/info', {
      id: this.data.id
    });

  }

  goEdit() {
    this.$router.push('/pages/store/storeInfo/index', {
      id: this.data.id
    })
  }


}

origin(Page)