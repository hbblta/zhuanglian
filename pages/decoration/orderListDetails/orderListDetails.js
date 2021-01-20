// pages/decoration/orderListDetails/orderListDetails.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
     userlist :[],
     OrderData : {},
     OrderID : '',
     list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      OrderID : options.OrderID
    })
    this.getOrderData()
    this.getStaffList()
  },
  getOrderData(){
    app.ajaxToken('/shop/getorderdetail/'+app.globalData.userData.ShopID+'/'+this.data.OrderID,'','get').then(res=>{
      app.globalData.orderDetails = res.data
      this.setData({
        OrderData : res.data
      })
    })
  },
  getStaffList(){
    app.getStaffList(res=>{
      this.setData({
        userlist:  res
      })
    })
  },
  bindPickerChange1: function(e) {
    this.setData({
      'OrderData.DesignerID': this.data.userlist[e.detail.value].UserID
    })
    this.refreshOrder()
  },
  bindPickerChange2: function(e) {
    this.setData({
      'OrderData.DesignerAssistance': this.data.userlist[e.detail.value].UserID
    })
    this.refreshOrder()
  },
  bindPickerChange3: function(e) {
    this.setData({
      'OrderData.TrackerID': this.data.userlist[e.detail.value].UserID
    })
    this.refreshOrder()
  },
  refreshOrder(){
    var data = {
      TrackerID : this.data.OrderData.TrackerID ? this.data.OrderData.TrackerID : app.globalData.userData.UserID,
      DesignerID : this.data.OrderData.DesignerID ? this.data.OrderData.DesignerID : app.globalData.userData.UserID,
      DesignerAssistance : this.data.OrderData.DesignerAssistance ? this.data.OrderData.DesignerAssistance : app.globalData.userData.UserID,
    }
    app.ajaxToken('/shop/allocorder/'+app.globalData.userData.ShopID+'/'+this.data.OrderID,data,'post').then(res=>{
      this.getOrderData()
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