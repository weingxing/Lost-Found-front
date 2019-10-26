// pages/singup/singup.js
const app = getApp();
import api from "../../utils/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sid: "null"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  getID: function (e) {
    this.setData({ sid: e.detail })
  },

  sure: function (e) {
    const that = this;
    wx.request({
      url: api.addUser,
      data: {
        openid: app.globalData.openid,
        sid: that.data.sid
      },
      success(res) {
        wx.navigateBack({
          delta: 1
        })
      },
      fail(err) {
        wx.showToast({
          title: '请重试',
          icon: 'none'
        })
      }
    })
  }
})