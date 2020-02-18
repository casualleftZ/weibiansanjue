//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)


    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: this.globalData.serverUrl + '/getcode?code=' + res.code,
          success: (res) => {
            this.globalData.openId = res.data
            
          }
        })
      }
    })



    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              // console.log(res.userInfo)
              var userInfo = res.userInfo
              this.globalData.userInfo = userInfo
              this.globalData.isLogin=true
             

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


  // saveUser: function() {
  //   console.log(this.globalData.userInfo)
  //   wx.request({
  //     url: this.globalData.serverUrl + '/saveuser',
  //     method: 'POST',
  //     data: {
  //       userId: this.globalData.openId,
  //       nickName: this.globalData.userInfo.nickName,
  //       faceImage: this.globalData.userInfo.avatarUrl
  //     },
  //     success: (res) => {
  //       console.log(res.data)
  //     }
  //   })
  // },

  // 将用户信息存入缓存
  setGlobalInfo: function(user) {
    wx.setStorageSync("userInfo", user)
  },

  //将用户信息从缓存中取出
  getGlobalInfo: function() {
    return wx.getStorageSync("userInfo")
  },

  globalData: {
    serverUrl: "http://127.0.0.1:8080",
    openId: '',
    userInfo: null,
    isLogin:false
  }
})