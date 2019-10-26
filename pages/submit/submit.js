// pages/submit/submit.js
var app = getApp()
import api from "../../utils/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uploadIcon: "/imgs/img_upload.png",
    img: "NaN",
    locate: "NaN",
    backWay: "NaN",
    time: "NaN",
    lostInfo: "NaN",
    describe: "NaN",
    hiddenDel: true,
    message: '',
    status: false,
    notStatus: true,

    fktc: [
      { "time": "7月3日下午3点左右", "locate": "图书馆二楼", "describe": "一把雨伞", "sn": "1556623790136", "img": api.getDomain + "/find/fuckTC/san.jpg" },
      { "time": "7月3日下午6点", "locate": "图书馆二楼楼梯处", "describe": "一串钥匙", "sn": "1556623890458", "img": api.getDomain + "/find/fuckTC/yaoshi.jpg" },
      { "time": "7月4日下午6点", "locate": "一教113左侧第三排", "describe": "一把个水杯", "sn": "1556623945621", "img": api.getDomain + "/find/fuckTC/shuibei.jpg" },
      { "time": "7月8日下午2点30", "locate": "M5-510", "describe": "一个U盘", "sn": "1556624131156", "img": api.getDomain + "/find/fuckTC/upan.jpg" },
      { "time": "7月10日上午10点21", "locate": "一教231左侧第三排", "describe": "一个眼镜盒，里面有两块眼镜布", "sn": "1556624265987", "img": api.getDomain + "/find/fuckTC/yanjinghe.jpg" },
      ]
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
    var status = app.globalData.status
    var notStatus = !app.globalData.status
    this.setData({
      status: status,
      notStatus: notStatus
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

  getLocate: function (e) {
    this.setData({ locate: e.detail })
    console.log(this.data.locate);
  },

  getBackWay: function (e) {
    this.setData({ backWay: e.detail })
    console.log(this.data.backWay);
  },

  getTime: function (e) {
    this.setData({ time: e.detail })
    console.log(this.data.time);
  },

  getLostInfo: function (e) {
    this.setData({ lostInfo: e.detail })
    console.log(this.data.lostInfo);
  },

  getDescribe: function (e) {
    this.setData({ describe: e.detail })
    console.log(this.data.describe);
  },

  upload: function (e) {
    const timestamp = Date.parse(new Date());
    const that = this;
    wx.chooseImage({
      sizeType: ['compressed'],
      success(res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: api.upload,
          formData: {
            "enctype": "multipart/form-data"
          },
          filePath: tempFilePaths[0],
          name: 'img' + timestamp + '.jpg',
          success(res) {
            console.log(tempFilePaths[0]);
            const data = res.data;
            that.setData({
              hiddenDel: false,
              img: tempFilePaths[0],
              uploadIcon: tempFilePaths[0]
            })
          },
          fail(err) {
            console.log(err);
            // that.setData({
            //   hidden_delete: false,
            //   img: tempFilePaths[0]
            // })
          }
        })
      }
    })
  },

  deleteImg: function (e) {
    wx.request({
      url: api.deleteImg,
      data: {
        img: this.data.img
      },
      success(res) {
        console.log(res);
      }
    })
    this.setData({
      hiddenDel: true,
      uploadIcon: "/imgs/img_upload.png"
    })
  },
  submit: function (e) {
    console.log(e);
    const that = this;
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
    }
    else if (this.data.locate != "NaN" && this.data.backWay != "NaN" &&
      this.data.describe != "NaN" && this.data.time != "NaN") {
      wx.request({
        url: api.submit,
        data: {
          locate: this.data.locate,
          backWay: this.data.backWay,
          time: this.data.time,
          lostInfo: this.data.lostInfo,
          describe: this.data.describe,
          img: this.data.img,
          openid: app.globalData.openid
        },
        success(res) {
          console.log(res);
          if (res.statusCode == 200) {
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 2000
            })
            that.setData({
              message: '',
              uploadIcon: "/imgs/img_upload.png",
              hiddenDel: true,
            })
          } else {
            wx.showToast({
              title: '提交失败，请重试',
              icon: 'none',
              duration: 2000
            })
          }
        },
        fail(res) {
          wx.showToast({
            title: '提交失败，请重试',
            icon: 'none',
            duration: 2000
          })
        }
      })
    } else {
      wx.showToast({
        title: '请补全信息',
        icon: 'none'
      })
    }
  },

  detail: function (e) {
    wx.setStorageSync("click", e.currentTarget.dataset);
    wx.navigateTo({
      url: '../detail/detail',
    })
  }
})