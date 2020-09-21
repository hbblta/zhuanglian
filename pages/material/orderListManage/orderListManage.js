// pages/material/orderListManage/orderListManage.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabType:['订单来源','管理人员','订单进度','时间','星级']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '订单管理'
    })
  },
  goUrl(e){
    app.goUrl(e.currentTarget.dataset.url)
  },
  delete(e){
    console.log('删除')
  },
  follow(e){
    console.log('跟进')
    app.goUrl('/pages/material/clientFollowUp/clientFollowUp')
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