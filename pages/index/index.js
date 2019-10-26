//index.js
//获取应用实例
const app = getApp()
import api from "../../utils/api.js"

Page({
  data: {
    key: "NaN",
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad: function () {

  },

  getKey: function(e) {
    var key = e.detail
    this.setData({ key: key });
  },

  search: function(e) {
    var that = this;
    if (app.globalData.userInfo == null) {
      wx.showToast({
        title: '请登录',
        icon: 'none',
        success(res) {
          setTimeout(function (e) {
            wx.switchTab({
              url: '../user/user'
            })
          }, 500, res)
        }
      })
    } else if (this.data.key != "NaN") {
      wx.request({
        url: api.search,
        data: {
          key: this.data.key
        },
        success(res) {
          if (res.statusCode == '200') {
            app.globalData.resultSet = res.data;
            wx.showLoading({
              title: '加载中',
            })
            setTimeout(function () {
              wx.hideLoading()
              wx.navigateTo({
                url: '../search/search',
              })
            }
           , 1000)
            
          } else {
            wx.showToast({
              title: '请重试',
              icon: 'none'
            })
          }
        },
        fail(err) {
          console.log("请求错误" + err);
          wx.showToast({
            title: '网络错误，请重试',
            icon: 'none'
          })
        }
      })
    } else if (this.data.key == 'NaN') {
      wx.showToast({
        title: '关键词为空',
        icon: 'none'
      })
    }
  }
})
