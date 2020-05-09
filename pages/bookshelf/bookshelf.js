// pages/bookshelf/bookshelf.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin:false,
    haveBook:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var isLogin = app.globalData.isLogin
    var userInfo = app.getGlobalInfo()
    this.setData({
      isLogin:isLogin
    })

  wx.request({
    url: app.globalData.serverUrl +'/book/mycollect?userId='+userInfo.userId,
    success:(res)=>{
      console.log(res.data)
      this.setData({
        bookList:res.data.data,
        haveBook: true,
        serverUrl: app.globalData.serverUrl
      })
    }
  })
  },

  login:function(){
    wx.switchTab({
      url: '/pages/me/me'
    })
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

  }
})