const origin = require('../../unity/origin/origin')


class Page {
    data = {
        userInfo: null
    }
    onStart() {

    }
    getUserInfo(e) {
        wx.showLoading({
            title: '登录中',
            mask: true,
        });
        wx.login({
            success: async ({ code }) => {
                //发起网络请求

                try {
                    const res = await this.$http.post('/auth/login', { code: code, iv: e.detail.iv, encryptedData: e.detail.encryptedData });
                    this.setData({ userInfo: res.data });
                    wx.hideLoading();
                    wx.setStorageSync('jwt', res.jwt);
                    wx.setStorageSync('userInfo', res.data);
                    getApp().globalData.userInfo = res.data;
                    wx.showToast({
                        title: '登录成功',
                        icon: 'none',
                        mask: true,
                    });
                    setTimeout(() => {
                        this.back()
                    }, 300);
                } catch (error) {
                    wx.showToast({
                        title: '登录失败！',
                        icon: 'none'
                    })
                }

            }
        });
    }
    back() {
        this.$router.go(-1);
    }
}

origin(Page);