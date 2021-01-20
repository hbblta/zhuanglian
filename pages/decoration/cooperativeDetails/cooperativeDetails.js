// pages/decoration/cooperativeDetails/cooperativeDetails.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cooperationData : {},
    list:[],
    textListIndex:0,
    textList : [
      {
        name : '引流客户',
        id : 0,
        num: 0
      },
      {
        name : '分享总订单',
        id : 1,
        num: 0
      },
      {
        name : '成交订单',
        id : 2,
        num: 0
      },
      {
        name : '未成订单',
        id : 2,
        num: 0
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      cooperationData : app.globalData.cooperationData
    })
    wx.setNavigationBarTitle({
      title: '详情',
    })
    this.getTextList()
    this.getList()
  },
  changeIndex(e){
    this.setData({
      textListIndex : e.currentTarget.dataset.index
    })
    this.getList()
  },
  goUrl(e){
    app.goUrl(e.currentTarget.dataset.url)
  },
  getTextList(){
    app.ajaxToken('/shop/getcooperationstat/'+app.globalData.userData.ShopID+'/'+this.data.cooperationData.ShopID,'','get').then(res=>{
      this.setData({
        'textList[0].num' : res.data.Customers,
        'textList[1].num' : res.data.Orders,
        'textList[2].num' : res.data.DealOrders,
        'textList[3].num' : res.data.Orders - res.data.Customers,
      })
    })
  },
  getList(){
    var data = {
      page : 1,
      pagesize : 10,
    }
    if(this.data.textListIndex != 0) data.type = this.data.textListIndex
    app.ajaxToken((this.data.textListIndex != 0 ? '/shop/getcooperationorderlist/' : '/shop/getdraincustomerlist/')+app.globalData.userData.ShopID+'/'+this.data.cooperationData.ShopID,data,'get').then(res=>{
      this.setData({
         list : res.data
      })
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