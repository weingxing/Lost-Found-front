//app.js
import api from "/utils/api.js"

App({
  onLaunch: function () {
    // 登录
    var code;
    const that = this;
    wx.login({
      success: res => {
        if (res.code) {
          console.log(res.code)
          wx.request({
            url: api.login,
            data: {
              code: res.code
            },
            success: function (res) {
              if (res.data) {
                var app = getApp();
                app.globalData.openid = res.data;
              }
              wx.request({
                url: api.status,
                data: {
                },
                success: function (res) {
                  if (res.data == 1) {
                    var app = getApp();
                    app.globalData.status = true;
                  } else {
                    var app = getApp();
                    app.globalData.status = false;
                  }
                }
              })
            },
            fail: function () {
              wx.showModal({
                title: '提示',
                content: '加载失败,请检查网络状态',
                showCancel: false,
                success: function (res) {
                  wx.navigateBack({
                    delta: 1
                  })
                }
              })
            }
          })
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    openid: null,
    status: false,
    resultSet: [],
  }
})