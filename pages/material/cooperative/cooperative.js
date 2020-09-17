// pages/material/cooperative/cooperative.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textListIndex:0,
    commissiontype:0,
    textList:[
      {
        name : '合作装企',
        id: 0
      },
      {
        name : '合作发起',
        id: 1
      },
      {
        name : '装企分配',
        id: 2
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '合作管理',
    })
  },
  changeIndex(e){
    this.setData({
      textListIndex : e.currentTarget.dataset.index
    })
  },
  changeCommissionType(e){
    this.setData({
      commissiontype : e.currentTarget.dataset.commissiontype
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