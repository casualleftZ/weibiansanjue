// pages/me/mine/mine.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 1,
    isFollow: false,
    // 用于分页的属性
    totalPages: 1, //总页数
    page: 1, //当前页数
    bookList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var index = options.index
    var userInfo = app.getGlobalInfo()
    var page = this.data.page
    this.setData({
      index: index,
      userInfo: userInfo
    })

    this.getBooks(page)
    this.getFollows()
    this.getFans()
  },

  //获取图书列表
  getBooks: function(page) {
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.globalData.serverUrl + '/user/mybook?userId=' + this.data.userInfo.userId + '&page=' + page,
      success: (res) => {
        wx.hideLoading()
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
        console.log(res.data.data)

        if (page == 1) {
          this.setData({
            bookList: []
          })
        }

        var bookList = res.data.data.records
        var newBook = this.data.bookList
        // for (var idx in bookList) {
        //   //用for...in遍历"数组": 循环变量x是数组的下标 
        //   var book = bookList[idx]
        //   var title = book.bookName
        //   if (title.length > 5) {
        //     title = title.substring(0, 5) + '...'
        //   }
        //   book["bookName"]=title
        // }
        this.setData({
          bookList: newBook.concat(bookList),
          page: page,
          totalPages: res.data.data.pages,
          serverUrl: app.globalData.serverUrl
        })
      }
    })
  },

  //获取关注列表
  getFollows: function() {
    wx.showLoading({
      title: '加载中..',
    })
    wx.request({
      url: app.globalData.serverUrl + '/user/getfollows?userId=' + this.data.userInfo.userId,
      success: (res) => {
        wx.hideLoading()
        var followList = res.data.data
        this.setData({
          followList: followList,

        })
      }
    })
  },

  //获取粉丝列表
  getFans: function() {
    wx.showLoading({
      title: '加载中..',
    })
    wx.request({
      url: app.globalData.serverUrl + '/user/getfans?userId=' + this.data.userInfo.userId,
      success: (res) => {
        wx.hideLoading()
        var followList = res.data.data
        this.setData({
          fansList: followList,
        })
      }
    })
  },

  //关注与取消关注
  follow: function(e) {
    var fansId = e.currentTarget.dataset.fansid;
    var followMe = e.currentTarget.dataset.isfollow;

    var url = ""
    if (followMe) {
      url = "/user/unfollow?userId=" + fansId + "&fansId=" + this.data.userInfo.userId
    } else {
      url = "/user/followme?userId=" + fansId + "&fansId=" + this.data.userInfo.userId
    }
    wx.showLoading({
      title: '请稍等..',
    })
    wx.request({
      url: app.globalData.serverUrl + url,
      success: (res) => {
        this.getFans()
        this.getFollows()
        wx.hideLoading()
        wx.showToast({
          title: res.data.data,
          icon: "success",
          duration: 1000
        })
      }
    })

  },

  //查看他人主页
  otherInfo:function(e){
    var otherId = e.currentTarget.dataset.otherid;
    var otherfollow = e.currentTarget.dataset.otherfollow;
    wx.navigateTo({
      url: '../other/other?otherId=' + otherId + '&otherfollow=' + otherfollow,
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
    wx.showNavigationBarLoading()
    this.getBooks(1)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var currentPage = this.data.page
    var totalPages = this.data.totalPages
    if (currentPage == totalPages) {
      wx.showToast({
        title: '没有更多了，亲',
        icon: 'none',
        duration: 1000
      })
      return
    }
    var page = currentPage + 1
    this.getBooks(page)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})