const origin = require('../../unity/origin/origin')
const computedBehavior = require('miniprogram-computed')


/**
 * 页面类
 */
class Page {
  behaviors = [computedBehavior]
  data = {
    goodsclass: [],
    list: [],
    active: '',
    classTree: [],
    totalPrice: 0,
    totalText: 0,
    TabActive: 0,
    info:{}
  }
  computed = {
    total(data) { },
    // totalPrice(data) {
    //   console.warn(1);
    //   // let total = data.list.filter(el => el.select_value > 0).map(el => el.o_price * el.select_value).reduce((total, el) => total + el, 0);
    //   const classTree = data.classTree;
    //   let total = 0;
    //   classTree.forEach(el => {
    //     total += el.child.map(goods => goods.o_price * goods.select_value).reduce((total, el) => total + el, 0);
    //   });

    //   return total.toFixed(2);
    // }
  }
  watch = {
    totalText() {

    }
  }
  setTotal() {
    wx.vibrateShort({})
    // let total = data.list.filter(el => el.select_value > 0).map(el => el.o_price * el.select_value).reduce((total, el) => total + el, 0);
    const classTree = this.data.classTree;
    let total = 0;
    let totalText = 0;

    classTree.forEach(el => {
      total += el.child.map(goods => goods.price * goods.select_value).reduce((total, el) => total + el, 0);
      totalText += el.child.map(goods => goods.select_value).reduce((total, el) => total + el, 0);
    });
    this.setData({
      totalPrice: total.toFixed(2),
      totalText: totalText
    });


    if (this.data.totalText <= 0) {
      wx.removeTabBarBadge({
        index: 0
      })
    } else {
      wx.setTabBarBadge({
        index: 0,
        text: totalText + ''
      });
    }
  }
  /**
   * 启动函数
   */
  async onStart() {
    // wx.setNatigationBarTitle({
    //   title:this.$route.query.
    // })
    await this.update();
    await this.httpGoods();
    await this.httpstore();
  }
  async update() {
    try {
      const res = await this.$http.post('/class/list', {});
      if (res.code >= 1) {
        let list = res.data;


        let classTree = list.map(el => ({
          id: el.id,
          name: el.name,
          child: []
        }));
        await this.setData({
          goodsclass: list,
          classTree: classTree,
          active: res.data[0].id,
        });
      } else {
        this.setData({
          goodsclass: [],
          active: ''
        })
      }
    } catch (error) { }
  }
  async httpGoods() {
    try {
      const res = await this.$http.post('/goods/list', {});
      if (res.code < 0) return;
      const list = res.data;
      const classTree = this.data.classTree;
      list.forEach(el => {
        el.goods_head_list = el.goods_head_list.map(item=>this.$getUrl(item))
        
        el.select_value = 0;
        let classi = classTree.find(classItem => classItem.id == el.class_id);
        if (classi) {
          classi.child.push(el);
        }


      });


      this.setData({
        classTree: classTree
      });

    } catch (e) {
      console.warn(e);

    }
  }
  async httpstore(){
    try {
      const res = await this.$http.post('/store/info', {});
        if(res.code>=0){
          res.data.store_bg = this.$getUrl(res.data.store_bg)
          res.data.store_img =  res.data.store_img.map(el=>
            el = this.$getUrl(el)
          )
          this.setData({
            info:res.data
          })
        }
    } catch (error) {
      
    }
  }
  async onShow() {
    if (wx.getStorageSync('order_ok')) {
      wx.setStorageSync('order_ok', false);
      await this.update();
      await this.httpGoods()
      this.setData({
        totalPrice: 0
      })
      wx.removeTabBarBadge({
        index: 0
      })
    }
  }
  fangda(e){
    var list = this.data.info.store_img;
    let index = e.currentTarget.dataset.index;
    let imgArr = [];
    for (var i = 0;i <list.length;i++) {
      imgArr[i] = list[i]
    }
    wx.previewImage({
      current: imgArr[index],
      urls: imgArr
    });
  }
  onShareAppMessage() { }
  kong(){
    
  }
  submit() {

    if (!this.$isLogin()) {
      this.$router.push('/pages/auth/auth');
      return;
    }

    const classTree = this.data.classTree;
    let select = [];
    classTree.forEach(el => {
      let list = el.child.filter(el => el.select_value > 0);
      select = [...select, ...list];
    });
    if (select.length > 0) {
      wx.setStorageSync('select', select);
      this.$router.push('/pages/payInfo/payInfo', {

      });
    } else {
      wx.showToast({
        title: '请选择至少一件商品！',
        icon: 'none'
      });
    }

  }
  
}

origin(Page);