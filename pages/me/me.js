// pages/me/me.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    myBook: 0,
    follow: 0,
    fans: 0,
    servers: [],
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
      userInfo: userInfo,
      isLogin: isLogin,
    })
    
    //获取用户信息并存入缓存
    // this.getUser(openId)

  },


  getUserInfo: function(e) {
    this.userAuthorized()
  },

  //获取用户信息并存入缓存
  getUser: function(userId) {
    wx.request({
      url: app.globalData.serverUrl + '/user/getuserinfo?userId=' + userId,
      success: (res) => {
        console.log(res.data)
        var userInfo = res.data.data
        app.setGlobalInfo(userInfo)
        if (userInfo) {
          this.setData({
            myBook: userInfo.bookCounts,
            follow: userInfo.followCounts,
            fans: userInfo.fansCounts
          })}
        
        var serverList = [{
            index: 1,
            name: '我的书',
            number: this.data.myBook
          },
          {
            index: 2,
            name: '关注',
            number: this.data.follow
          },
          {
            index: 3,
            name: '粉丝',
            number: this.data.fans
          }
        ]
        this.setData({
          servers: serverList
        })
      }
    })
  },

  //我的书、关注、粉丝跳转

  bindNavigator: function(e) {
    if(this.data.isLogin){
      var url = e.currentTarget.dataset.path
      var index = e.currentTarget.dataset.index
      wx.navigateTo({
        url: '/pages/me/mine/mine?index=' + index,
      })
    }else{
      wx.showToast({
        title: '请先授权登录',
        icon:'none',
        duration:1000
      })
    }
  },

  bindtoNavigator:function(e){
    if (this.data.isLogin) {
      var url = ''
      var index = e.currentTarget.dataset.index
      
      switch (index) {
        case "5":
          url = '/pages/me/release/release'
          break;
        case "6":
          url = '/pages/me/advice/advice'
          break;
        case "7":
          url = '/pages/me/advice/advice?index=' + index
          break;
      } 
      
      wx.navigateTo({
        url: url
      })
    } else {
      wx.showToast({
        title: '请先授权登录',
        icon: 'none',
        duration: 1000
      })
    }
  },

  //获取用户信息
  userAuthorized: function() {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              // console.log(res.userInfo)
              app.globalData.isLogin=true
              var userInfo = res.userInfo
              this.setData({
                userInfo: userInfo,
                isLogin: true
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
                  this.getUser(this.data.openId)
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
    this.getUser(this.data.openId)
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