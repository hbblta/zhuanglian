// pages/decoration/caseDetails/caseDetails.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    styleId : '',
    caseData : {},
    caseUrl : '',
    id : ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id : options.id,
      styleId : options.styleId,
      caseUrl : options.type == 1 ? '/store/geteffectdetail/' : '/store/getstyledetail/'
    })
  },
  getCaseData(){
    var urlData = this.data.caseUrl == '/store/geteffectdetail/' ? this.data.id+'/'+this.data.styleId+'/'+app.globalData.userData.UserID : this.data.id+'/'+app.globalData.userData.UserID+'/'+this.data.styleId
    app.ajaxToken(this.data.caseUrl+urlData, '', 'get').then(res => {
      this.setData({
        caseData : res.data
      })
    })
  },
  collection(){
    var data = {
      shopId : app.globalData.userData.ShopID,
      userId :app.globalData.userData.UserID,
      styleId : this.data.styleId
    }
    var collectionUrl = this.data.caseUrl == '/store/geteffectdetail/' ? '/store/collectioneffect/' : '/store/collectionstyle/'
    app.ajaxToken(collectionUrl+app.globalData.userData.ShopID+'/'+app.globalData.userData.UserID+'/'+this.data.styleId, data, 'post').then(res => {
      wx.showToast({
        title: res.data.msg,
        icon : 'none'
      })
    })
  },
  goUrl(e){
    app.goUrl(e.currentTarget.dataset.url)
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
    this.getCaseData()
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