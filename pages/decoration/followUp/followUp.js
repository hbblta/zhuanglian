// pages/decoration/followUp/followUp.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textList:[],
    textListData : [],
    textListIndex:0,
    OrderID : '',
    state : '',
    orderDetails : {},
    list:[]
  },
  changeIndex(e){
    this.setData({
      textListIndex:e.currentTarget.dataset.index,
      list :[]
    })
    this.getList()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '客户详情'
    })
    this.setData({
      OrderID : options.OrderID,
      orderDetails : app.globalData.orderDetails,
      textListIndex : options.index - 0 + 1
    })
    this.getTextList()
  },
  getTextList(){
    app.ajaxToken('/common/getdecorationorderstates','','get').then(res=>{
      res.data.unshift({text:'全部',value:''})
      this.setData({
        textListData : res.data,
        textList : res.data.map(data=>{return data.text})
      })
    })
  },
  getList(){
    var data = {
      pagesize : 99
    }
    if(this.data.textListIndex) data.state = this.data.textListData[this.data.textListIndex].value
    app.ajaxToken('/shop/getordertrack/'+app.globalData.userData.ShopID+'/'+this.data.OrderID,data,'get').then(res=>{
      this.setData({
        list : res.data
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
    setTimeout(()=>{this.getList()},100)
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