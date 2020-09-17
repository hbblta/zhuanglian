// pages/decoration/cooperativeDetails/cooperativeDetails.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:8,
    textListIndex:0,
    textList : [
      {
        name : '引流客户',
        id : 0,
        num: 3253
      },
      {
        name : '分享订单',
        id : 1,
        num: 3212353
      },
      {
        name : '成交订单',
        id : 2,
        num: 3252343
      },
      {
        name : '成交总额',
        id : 2,
        num: 3252343
      },
      {
        name : '未成订单',
        id : 2,
        num: 3252343
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '详情',
    })
  },
  changeIndex(e){
    this.setData({
      textListIndex : e.currentTarget.dataset.index
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