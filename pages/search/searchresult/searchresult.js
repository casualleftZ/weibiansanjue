// pages/search/searchresult/searchresult.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用于分页的属性
    totalPages: 1,
    page: 1, //当前页数
    bookList: [],

    serverUrl: '',
    searchValue: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    var searchValue = options.searchValue
    this.setData({
      searchValue: searchValue
    })
    wx.showLoading({
      title: '加载中',
    })

    wx.request({
      url: app.globalData.serverUrl + '/search/savecontent?content=' + searchValue ,//仅为示例，并非真实的接口地址 
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        console.log(res.data)
      }
    })


    var page = this.data.page


    this.getAllVideos(page)
  },

  getAllVideos: function(page) {
    var serverUrl = app.globalData.serverUrl
    var searchContext = this.data.searchValue
    console.log(searchContext)
    wx.request({
      url: serverUrl + '/search//searchbook?content=' + searchContext+'&page=' + page, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        wx.hideLoading()
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
        console.log(res.data)
        if (page == 1) {
          this.setData({
            videoList: [],
          })
        }

        var bookList = res.data.data.records
        var newBookList = this.data.bookList
        this.setData({
          bookList: newBookList.concat(bookList),
          page: page,
          totalPages: res.data.data.pages,
          serverUrl: serverUrl
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
    //上拉刷新

    var currentPage = this.data.page
    var totalPages = this.data.totalPages

    if (currentPage == totalPages) {
      wx.showToast({
        title: '没有更多了',
        icon: 'none',
        duration: 2000
      })
    }

    var page = currentPage + 1
    this.getAllVideos(0, page)


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})