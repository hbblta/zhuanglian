// pages/decoration/personnelDetailsSelect/personnelDetailsSelect.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    list:['设计师','实习设计师']
  },
  getName(e){
    this.setData({
      name:e.detail.value
    })
  },
  active(e){
    this.setData({
      name:e.currentTarget.dataset.name
    })
  },
  sure(){
    let pages = getCurrentPages();
    let current= pages[pages.length - 2];
    current.setData({
      sjs:this.data.name
    })
    wx.navigateBack()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.ajaxToken('/common/getidentities','','get').then(res=>{
      this.setData({
        list:res.data
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