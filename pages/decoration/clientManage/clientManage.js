// pages/decoration/clientManage/clientManage.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabType:['客户类别','管理人员','客户来源','时间','星级']
  },

  //delete 
  delete(e){
    console.log('点击了删除')
  },
  //跟进
  follow(e){
    console.log('点击了跟进')
    app.goUrl('/pages/decoration/clientFollowUp/clientFollowUp')
  },
  //报单
  declaration(e){
    app.goUrl('/pages/decoration/declaration/declaration')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '客户详情'
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