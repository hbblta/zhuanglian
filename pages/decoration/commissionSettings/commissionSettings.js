// pages/decoration/commissionSettings/commissionSettings.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    OrderID : '',
    formData : {}
  },
  updateInput(e) {
    var formDataKey = `formData.${e.currentTarget.dataset.key}`
    this.setData({
     [formDataKey] : e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '报单'
    })
    this.setData({
      OrderID : options.OrderID
    })
    this.getCommission()
  },
  getCommission(){
    app.ajaxToken('/shop/getcommissions/'+app.globalData.userData.ShopID+'/'+this.data.OrderID,'','get').then(res=>{
      this.setData({
        formData:res.data
      })
    })
  },
  sumbit(){
    var data = {
      DisCommend : this.data.formData.DisCommend,
      DisInCommend : this.data.formData.DisInCommend,
      CustomerDeveloper : this.data.formData.CustomerDeveloper,
      CustomerManager : this.data.formData.CustomerManager,
      OrderManager : this.data.formData.OrderManager,
      Design : this.data.formData.Design,
    }
    app.ajaxToken('/shop/getcommissions/'+app.globalData.userData.ShopID+'/'+this.data.OrderID,data,'post').then(res=>{
      wx.showToast({
        title: '提交成功',
        mask:true
      })
      wx.navigateBack({
        delta:1,
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