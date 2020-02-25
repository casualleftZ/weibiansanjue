// pages/bookcity/bookcity.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '/images/read.png',
      '/images/read2.jpg',
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    indicatorcolor: "#FFFFFF",
    indicatoractivecolor: "#FF7F50",
    circular: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.hotUpdate()
    this.hotFinish()
  },

  tosearch: function() {
    wx.navigateTo({
      url: '../search/search',
    })
  },

  //首页热更
  hotUpdate: function() {
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.globalData.serverUrl + '/book/hotupdate',
      success: (res) => {
        wx.hideLoading()
        console.log(res.data.data)
        this.setData({
          updateBook: res.data.data
        })
      }
    })
  },
  //首页完结
  hotFinish: function() {
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.globalData.serverUrl + '/book/finish',
      success: (res) => {
        wx.hideLoading()
        this.setData({
          finishBook: res.data.data
        })
      }
    })
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})