const origin = require('../../../unity/origin/origin')
const computedBehavior = require('miniprogram-computed')

class Page {
  behaviors = [computedBehavior]
  data = {
    isAdd: false,
    TagName: '', //收货地址
    details: '', //门牌号
    from: {
      tag: '',//标签
      contacts: '', //联系人
      gender: 1, //性别
      phone: '', //手机号
      address_num: '',//具体门牌号
      address: '',//收货地址
    }
  }
  computed = {
  }
  watch = {
    details(val) {
      this.setData({
        ['from.address']: `${this.data.TagName},${val}`
      })
    }
  }
  async onStart() {

  }
  onUnload() {
    wx.removeStorageSync('addressinfo')
  }
  async onShow() {
    await this.updata()
    let addressinof = wx.getStorageSync('addressinfo')
    if (addressinof.length <= 0) return;
    this.setData({
      ['from.address']: addressinof.name,
      ['from.x']: addressinof.x,
      ['from.y']: addressinof.y,
      TagName: addressinof.name,
      ['from.p']: addressinof.province,
      ['from.c']: addressinof.city,
      ['from.a']: addressinof.region,
      ['from.address_num']: addressinof.num,
    })
  }
  async updata() {
    try {
      await this.setData({
        isAdd: typeof this.$route.query.id == 'undefined'
      });
      if (this.data.isAdd) {
        wx.setNavigationBarTitle({
          title: '新增收获地址'
        })
        return;
      }

      const res = await this.$http.post('/address/info', {
        id: this.$route.query.id
      });
      if (res.code <= 0) return;
      this.setData({
        from: res.data,
      })
      if (!res.data.address) return
      const addressArr = res.data.address.split(",")
      this.setData({
        TagName: addressArr[0],
        details: addressArr[1]
      })
      wx.setNavigationBarTitle({
        title: '编辑收获地址'
      })
    } catch (error) { }
  }

  ChoiceSex(e) {
    this.setData({
      sex: e.detail
    })
  }
  setSex(e) {
    this.setData({
      ['from.gender']: e.currentTarget.dataset.value
    })
  }
  setSex2(e) {
    this.setData({
      ['from.tag']: e.currentTarget.dataset.value
    })
  }
  select() {
    this.$router.push('/pages/search/address/address')
  }
  async conserve() {
    this.setData({
      ['from.address']: `${this.data.TagName},${this.data.details}`
    })
    // try {
    //   if (this.data.TagName == '') throw '未选择收货地址'
    //   if (this.data.from.contacts == '') throw '联系人姓名未填写'
    //   if (this.data.from.phone == '') throw '联系人手机号未填写'
    // } catch (error) {
    //   wx.showToast({
    //     title: error,
    //     icon: 'none'
    //   })
    //   return
    // }
    if (this.data.TagName == '') {
      this.$toast('未选择收货地址')
      return
    }
    if (this.data.from.contacts == '') {
      this.$toast('联系人姓名未填写')
      return
    }
    if (this.data.from.phone == '') {
      this.$toast('联系人手机号未填写')
      return
    }

    try {
      let vm = this
      const res = await this.$http.post('/address/save', this.data.from);
      if (res.code <= 0) return;
      if (this.data.isAdd) {
        wx.removeStorageSync('addressinfo')
        wx.showToast({
          title: '创建成功',
          success() {
            setTimeout(() => {
              vm.$router.go(-1)
            }, 500)
          }
        })
      } else {
        wx.removeStorageSync('addressinfo')
        wx.showToast({
          title: '编辑成功',
          success() {
            setTimeout(() => {
              vm.$router.go(-1)
            }, 500)
          }
        })
      }
    } catch (error) {
    }
  }
  async delete() {
    let vm = this
    wx.showModal({
      title: '提示',
      content: '确认删除地址吗',
      success: async (res) => {
        if (res.cancel) return;
        try {
          const res = await this.$http.post('/address/del', {
            id: this.data.from.id
          });
          if (res.code <= 0) return;
          wx.showToast({
            title: '删除成功',
            success() {
              setTimeout(() => {
                vm.$router.go(-1)
              }, 500)
            }
          })
        } catch (error) { }
      }
    })

  }
}

origin(Page);