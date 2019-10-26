// pages/historyDetail/historyDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    temp: {},
    img: '/imgs/logo.png',
    locate: "null",
    time: "null",
    sn: "null",
    describe: "null",
    backWay: "null",
    status: false,
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
    this.setData({ status: app.globalData.status })
    this.setData({ temp: wx.getStorageSync("history") })
    console.log(this.data.temp)
    this.setData({
      time: this.data.temp.time,
      locate: this.data.temp.locate,
      describe: this.data.temp.describe,
      sn: this.data.temp.sn,
      img: this.data.temp.img,
      backWay: this.data.temp.backWay
    });
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

  }
})