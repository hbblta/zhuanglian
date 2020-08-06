// pages/decoration/employeeWithdrawal/employeeWithdrawal.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: 5,
    textListIndex:0,
    customerType:0,
    textList : [
      {
        name : '佣金详情',
        id : 0
      },
      {
        name : '总佣金',
        id : 1
      },
      {
        name : '总佣金',
        id : 2
      },
      {
        name : '未付佣金',
        id : 3
      },
    ],
    windowHeight : 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({  
      success: (res) => {
        this.setData({
          windowHeight: (res.windowHeight * (750 / res.windowWidth))
        })
      },
    })
  },
  changeIndex(e){
    this.setData({
      textListIndex : e.currentTarget.dataset.index
    })
  },
  changeCustomer(e){
    this.setData({
      customerType : e.currentTarget.dataset.customertype
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