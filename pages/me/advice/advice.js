// pages/me/advice/advice.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var userInfo = app.getGlobalInfo()
    this.setData({
      userInfo:userInfo
    })
  },

  submitAdvice: function(e) {
    var adviceContent = e.detail.value.adviceContent
    var phone = e.detail.value.phone
    if (adviceContent.length > 200) {
      wx.showToast({
        title: '意见超过200字',
        icon: 'none',
        duration: 1000
      })
      return
    } else if (adviceContent.length ==0||adviceContent==null){
      wx.showToast({
        title: '意见不能为空',
        icon: 'none',
        duration: 1000
      })
      return
    }
    if(phone){
      var isPhone = this.isPoneAvailable(parseInt(phone))
      if (!isPhone) {
        wx.showToast({
          title: '请检查号码是否正确',
          icon: 'none',
          duration: 1000
        })
        return
      }
    }
    
    wx.showLoading({
      title: '提交中...',
    })
    wx.request({
      url: app.globalData.serverUrl + '/advice/saveadvice',
      method:'POST',
      data:{
        userId:this.data.userInfo.userId,
        content:adviceContent,
        userPhone:phone
      },
      success:(res)=>{
        console.log(res.data)
        wx.hideLoading()
        wx.showToast({
          title: '感谢您的建议！',
          icon:"success",
          duration:1000,
          success:(res)=>{
            wx.navigateBack({
              delta:1
            })
          }
        })
      }
    })
    
  },
  
  //验证是否为手机号码
  isPoneAvailable: function(pone) {
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(pone)) {
      return false;
    } else {
      return true;
    }
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