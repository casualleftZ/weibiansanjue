// pages/chapter/publish/publish.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var userId=options.userId
    var bookName = options.bookName
    var bookIcon = options.bookIcon
    var bookDesc = options.bookDesc

    this.setData({
      userId: userId,
      bookName: bookName,
      bookIcon: bookIcon,
      bookDesc: bookDesc
    })
  },

//发布图书
  uploadBook: function (e) {
    var chapterTitle = e.detail.value.title
    var chapterContent = e.detail.value.content
    
    console.log(this.data.userId)
    console.log(this.data.bookName)
    console.log(this.data.bookIcon)
    console.log(this.data.bookDesc)
    console.log(chapterTitle)
    console.log(chapterContent)

    wx.showLoading({
      title: '上传中...',
    })
    wx.uploadFile({
      url: app.globalData.serverUrl + '/user/uploadbook', //仅为示例，非真实的接口地址
      filePath: this.data.bookIcon,
      name: 'file',
      formData: {
        userId: this.data.userId,
        bookName:this.data.bookName,
        bookDesc: this.data.desc,
        chapterContent:chapterContent,
        chapterTitle:chapterTitle
      },
      success: (res) => {
        wx.hideLoading()
        wx.showToast({
          title: '上传成功',
          icon: 'success',
          duration: 1000,
          success: (res) => {
            wx.navigateBack({
              delta: 2
            })
          }
        })
      }
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