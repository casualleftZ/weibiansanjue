// pages/me/other/other.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    servers: [],
    // 用于分页的属性
    totalPages: 1, //总页数
    page: 1, //当前页数
    bookList: [],
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var otherId=options.otherId
    var isFollow = JSON.parse(options.otherfollow)
    var page = this.data.page
    var userInfo = app.getGlobalInfo()

    this.setData({
      otherId: otherId,
      isFollow: isFollow,
      userInfo:userInfo
    })
   
    
   //获取用户信息
    this.getOtherUser(otherId)
    this.getBooks(page)
  },

//获取用户信息
  getOtherUser:function(otherId){
    wx.request({
      url: app.globalData.serverUrl + '/user/getuserinfo?userId=' + this.data.otherId,
      success: (res) => {
        console.log(res.data)
        var userInfo = res.data.data
        this.setData({
            myBook: userInfo.bookCounts,
            follow: userInfo.followCounts,
            fans: userInfo.fansCounts,
            otherInfo:userInfo
          })
        
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

  //获取图书列表
  getBooks: function (page) {
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.globalData.serverUrl + '/user/otherbooks?userId=' + this.data.otherId + '&page=' + page,
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
      
        this.setData({
          bookList: newBook.concat(bookList),
          page: page,
          totalPages: res.data.data.pages
        })
      }
    })
  },

  //关注与取消关注
  follow: function (e) {
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
        wx.hideLoading()
        this.setData({
          isFollow: !this.data.isFollow,
        })
        wx.showToast({
          title: res.data.data,
          icon: "success",
          duration: 1000
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
  onShareAppMessage: function () {

  }
})