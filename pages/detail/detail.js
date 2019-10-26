// pages/detail/detail.js
const app = getApp();
import api from "../../utils/api.js"
import Dialog from '../../dist/dialog/dialog';
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
    notDisplay: true,
    status: false,
    hasClicked: false,
    notClicked: true,
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
    this.setData({ temp: wx.getStorageSync("click") })
    console.log(this.data.temp)
    this.setData({
      time: this.data.temp.time,
      locate: this.data.temp.locate,
      describe: this.data.temp.describe,
      sn: this.data.temp.sn,
      img: this.data.temp.img
    });

    const that = this;
    const timestamp = Date.parse(new Date());
    wx.request({
      url: api.showWay,
      data: {
        openid: app.globalData.openid,
        sn: this.data.sn,
        time: timestamp
      },
      
      success(res) {
        console.log(res.data);
        that.setData({ backWay: res.data })
      }
    })
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

  showBackWay: function (e) {
    if (this.data.backWay == 'NoUser') {
      wx.navigateTo({
        url: '../singup/singup',
      })
    } else if(this.data.backWay != 'null') {
      this.setData({ 
        hasClicked: true,
        notClicked: false 
        })
    }
  },

  previewImg: function (e) {
    var imgArr = [this.data.img];
    wx.previewImage({
      current: imgArr[0],
      urls: imgArr,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  copyBackWay: function (e) {
    var temp = this.data.backWay;
    wx.setClipboardData({
      data: temp,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            console.log(res.data);
            wx.showToast({
              title: '复制成功',
              icon: 'success',
            })
          }
        })
      }
    })
  },

  confirm: function (e) {
    const timestamp = Date.parse(new Date());
    Dialog.confirm({
      title: '注意',
      message: '请确认物品是否为你的，确认后物品将记录到个人记录中且不再被其他用户搜索到'
    }).then(() => {
      // on confirm
      console.log("confirm")
      wx.request({
        url: api.getIt,
        data: {
          openid: app.globalData.openid,
          sn: this.data.sn,
          time: timestamp
        },
        success(res) {
          if (res.statusCode == '200') {
            wx.showToast({
              title: '成功，请按照取回方式取回物品',
              icon: 'success'
            })
          } else {
            wx.showToast({
              title: '请重试',
              icon: 'none'
            })
          }
        }
      })
    }).catch(() => {
      // on cancel
      console.log("cancel")
    });
  }
})