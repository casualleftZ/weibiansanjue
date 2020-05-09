// pages/comment/comment.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var bookid = options.bookid
    var user = app.getGlobalInfo()
    this.setData({
      userInfo:user,
      bookid:bookid
    })
    this.getComment(bookid)

  },
  getComment: function (bookid){
    wx.request({
      url: app.globalData.serverUrl + '/comment/getcomments?bookId=' + bookid,
      success: (res) => {
        console.log(res.data.data)
        this.setData({
          commentList: res.data.data,
          serverUrl: app.globalData.serverUrl
        })
      }
    })
  },

  getInputValue:function(e){
    var comment = e.detail.value
    wx.request({
      url: app.globalData.serverUrl + '/comment/addcomments',
      method:'POST',
      data:{
        userId:this.data.userInfo.userId,
        wchapterId:this.data.bookid,
        content:comment,
        faceImg: this.data.userInfo.faceImage,
        userName: this.data.userInfo.nickName
      },
      success: (res) => {
        console.log(res.data.data)
        this.setData({
          inputValue: ''
        })
        this.getComment(this.data.bookid)
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