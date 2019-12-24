const origin = require('../../unity/origin/origin')

class Page {
  data = {
    indicatorDots: true,
    radius: 0,
    id: "",
    info:{}
  }
  onStart() {
    this.setData({
      id: this.$route.query.id
    })
    this.update()
  }
  async update() {
    const res = await this.$http.post("/goods/info",{id:this.data.id})
    if(res.code>=0){
      res.data.goods_head =  res.data.goods_head.map(el =>this.$getUrl(el))
      this.setData({
        info:res.data
      })
    }
  }


}

origin(Page)