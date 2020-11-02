// pages/decoration/clientFollowUp/clientFollowUp.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textList:['客户动态','客户统计','TA的订单','TA的跟进'],
    textListIndex:0,
    followList:[],
  },
  //获取跟进列表
  getfollow(){
    app.ajaxToken('/shop/getcustomertracklist/'+app.globalData.userData.ShopID+'/'+this.data.id,'','get').then(res=>{
      this.setData({
        followList:res.data
      })
    })
  },
  //获取客户统计
  getcount(){
    app.ajaxToken('/shop/getcustomerstatlist/'+app.globalData.userData.ShopID+'/'+this.data.id,'','get').then(res=>{
      console.log(index)
    })
  },
  changeIndex(e){
    this.setData({
      textListIndex:e.currentTarget.dataset.index
    })
    console.log(e)
    this.changeF()
  },
  changeF(){
    console.log(this.data.textListIndex)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '客户详情'
    })
    this.setData({
      id:options.id,
      textListIndex:options.idx?options.idx:0
    })
    let pages = getCurrentPages();
    let current = pages[pages.length - 2];
    this.setData({
      item: current.data.nowobj
    })
    this.getfollow()
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