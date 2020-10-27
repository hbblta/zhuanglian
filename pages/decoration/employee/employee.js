// pages/decoration/employee/employee.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commissionType : 0,
    list:5,
    keyword:'',
    page:1,
  },
  getvalue(e){
    this.setData({
      keyword:e.detail.value,
      page:1,
      list:[]
    })
    this.getUser()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '员工管理',
    })
  },
  changeCommissionType(e){
    this.setData({
      commissionType : e.currentTarget.dataset.commissiontype,
      page:1,
      list:[],
      keyword:''
    })
    this.getUser()
  },
  goUrl(e){
    app.goUrl(e.currentTarget.dataset.url)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getUser(){
    var data = {
      keyword:this.data.keyword,
      state:this.data.commissionType?0:2,
      page:this.data.page,
    }
    app.ajaxToken('/shop/getstafflist/'+app.globalData.userData.ShopID,data,'get').then(res=>{
      console.log(res)
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getUser()
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