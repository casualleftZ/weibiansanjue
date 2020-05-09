const app = getApp();
let _page;
let appDatas=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // isLogin:false,
    // haveBook:false,
    // ellipsis:true ,//文本是否收缩
    // updateBook: {},
  },
  // ellipsis: function () {
  //   _page=this;
  //   let value=!this.data.ellipsis;
  //   console.log(value);
  //   _page.setData({
  //     ellipsis: value
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var isLogin = app.globalData.isLogin
    console.log(options);
    var bookId=options.bookid
    var userInfo = app.getGlobalInfo()
    this.setData({
      bookId:bookId,
      userInfo:userInfo
    })
    //获取参数值
    
    
    // this.setData({
    //   isLogin:isLogin,
    //   updateBook: appDatas.data.updateBookArr[options.id]
    // })

    wx.request({
      url: app.globalData.serverUrl + '/book/getbookid?bookId='+bookId,
      success: (res) => {
        console.log(res.data.data)
        this.setData({
          updateBook: res.data.data,
          serverUrl: app.globalData.serverUrl
        })
      }
    })
  },

  //加入书架与取消加入
  collect:function(e){
    var iscollect = e.currentTarget.dataset.iscollect;
    var url=''
    //判断这本书是否已经收藏
    if(iscollect){
      //取消收藏
      url ="/book/uncollect?userId="+this.data.userInfo.userId+'&bookId='+this.data.bookId
    }else{
      //收藏
      url = "/book/collectbook?userId=" + this.data.userInfo.userId + '&bookId=' + this.data.bookId
    }
    wx.request({
      url: app.globalData.serverUrl + url,
      success: (res) => {
        //显示收藏/取消收藏成功
        wx.showToast({
          title: res.data.data,
          icon: "success",
          duration: 1000
        })
      }
    })
  },
  
  login:function(){
    wx.switchTab({
      url: '/pages/me/me'
    })
  },

  comment:function(){
    wx.navigateTo({
      url: '../../comment/comment?bookid='+this.data.bookId,
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