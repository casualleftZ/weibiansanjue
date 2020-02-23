// pages/me/release/release.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hideAdd: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var userInfo = app.getGlobalInfo()
    this.setData({
      userInfo: userInfo
    })
  },

  //前往发布第一章
  formSubmit: function (e) {
    var img_url = this.data.img_url
    var bookName = e.detail.value.title
    var bookDesc = e.detail.value.content

    wx.navigateTo({
      url: '../../chapter/publish/publish?userId='+this.data.userInfo.userId+
      '&bookName='+bookName+'&bookIcon='+img_url+'&bookDesc='+bookDesc,
    })
  },

  //发布图书
 

  //从相册选择图片
  chooseimage: function(e) {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success: (res) => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        this.setData({
          img_url: tempFilePaths[0],
          hideAdd: true
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