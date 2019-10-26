// pages/history/history.js
const app = getApp()
import api from "../../utils/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: [],
    haveInfo: false,
    notHaveInfo: true,

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
    var that = this
    wx.request({
      url: api.getHistory,
      data: {
        openid: app.globalData.openid,
        type: 'lost'
      },
      success(res) {
        that.setData({ result: res.data })
        console.log(res.data)
      }
    })
    wx.showLoading({
      title: '加载中',
    })

    var that = this
    setTimeout(function () {
      wx.hideLoading()
      if (that.data.result == null || that.data.result == "") {
        that.setData({
          haveInfo: false,
          notHaveInfo: true
        });
      } else {
        that.setData({
          haveInfo: true,
          notHaveInfo: false
        })
      }
    }, 1000)
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

  detail: function(e) {
    wx.setStorageSync("history", e.currentTarget.dataset);
    wx.navigateTo({
      url: '../historyDetail/historyDetail',
    })
  }
})