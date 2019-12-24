const origin = require('../../unity/origin/origin')

class Page {
  data = {
    indicatorDots: true,
    radius: 0,
    id: "",
    info:{}
  }
  onStart() {
    this.update()
  }
  async update() {
    const res = await this.$http.post("/store/domain/info",{})
    if(res.code>=0){
      res.data.qy_business = this.$getUrl(res.data.qy_business)
      res.data.qy_licence = this.$getUrl(res.data.qy_licence)
      this.setData({
        info:res.data
      })
    }
  }
  fangda(e){
    let arrImg = [this.data.info.qy_business,this.data.info.qy_licence]
    wx.previewImage({
      current:arrImg[e.currentTarget.dataset.index],
      urls: arrImg
    });
  }
  


}

origin(Page)