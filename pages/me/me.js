// pages/me/me.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var isLogin = app.globalData.isLogin
    var userInfo = app.globalData.userInfo
    var openId = app.globalData.openId

    this.setData({
      openId: openId,
      userInfo:userInfo,
      isLogin:isLogin
    })


  },


  getUserInfo: function(e) {
    this.userAuthorized()
  },

  //获取用户信息
  userAuthorized: function() {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          this.setData({
            isLogin: true
          })
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              // console.log(res.userInfo)
              var userInfo = res.userInfo
              this.setData({
                userInfo:userInfo
              })
              wx.request({
                url: app.globalData.serverUrl + '/saveuser',
                method: 'POST',
                data: {
                  userId: this.data.openId,
                  nickName: userInfo.nickName,
                  faceImage: userInfo.avatarUrl
                },
                success: (res) => {
                  console.log(res.data)
                }
              })

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
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