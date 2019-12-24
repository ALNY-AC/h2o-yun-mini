const origin = require('../../unity/origin/origin')
const computedBehavior = require('miniprogram-computed')

/**
 * 页面类
 */
class Page {
  behaviors = [computedBehavior]
  data = {
    msg: '',
    height: '',
    userInfo: null,
    list:[
      {
        id:0,
        price:"5",
        time:"2019-12-31",
        type:1,
        child:[
         
        ]
      },
      {
        id:1,
        price:"3",
        time:"2019-12-31",
        type:2,
        child:[
          {
            name:"小笼包"
          },
          {
            name:"汉堡包"
          }
        ]
      },
      {
        id:2,
        price:"5",
        time:"2019-12-31",
        type:1,
        child:[
          
        ]
      }
    ]
  }
  changeParent() {
    var pages = getCurrentPages(); //当前页面栈
    if (pages.length > 1) {
      var beforePage = pages[pages.length - 2]; //获取上一个页面实例对象
      beforePage.changeData(); //触发父页面中的方法
    }
  }
  select(e){
    var price = e.currentTarget.dataset.price
    var id = e.currentTarget.dataset.id
    wx.setStorage({
      key:"coupons",
      data:{
        id:id,
        price:price
      }
    })
    this.changeParent()
    wx.navigateBack({
     delta:1
    })
    
  }
  onStart() {
  

  }
  onShow() {
 

  }

  update() {

  }

 


}

origin(Page);