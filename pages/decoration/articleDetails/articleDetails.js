// pages/decoration/articleDetails/articleDetails.js\
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsId : '',
    articleData : {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      newsId : options.newsId
    })
    wx.setNavigationBarTitle({
      title: '详情'
    })
    this.getArticle()
  },
  getArticle(){
    app.ajaxToken('/shop/gettransfernewsdetail/'+app.globalData.userData.ShopID+'/'+this.data.newsId,'', 'get').then(res => {
      this.setData({
        articleData : res.data
      })
    })
  },
  inputChange(e){
    this.setData({
      'articleData.Signature' : e.detail.value
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
    if(this.data.articleData.Signature){
      var data = {
        content : this.data.articleData.Signature
      }
      app.ajaxToken('/shop/setsign/'+app.globalData.userData.ShopID,data, 'post').then(res => {})
    }
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