// pages/decoration/bannerList/bannerList.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list : []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBannerList()
  },
  getBannerList(){
    app.ajaxToken('/shop/getshopadvs/'+app.globalData.userData.ShopID,'', 'get').then(res => {
      this.setData({
        list : res.data
      })
    })
  },
  changeIsGround(e){//上下架更改状态
    console.log()
    var data = {
      isEnable : e.currentTarget.dataset.ground == 1 ? 0 : 1,
      shopAdvId : e.currentTarget.dataset.id,
    }
    
    app.ajaxToken('/shop/enableshopadv/'+app.globalData.userData.ShopID,data,'post').then(res => {
      wx.showToast({
        title: res.msg,
        icon:'none'
      })
      this.getBannerList()
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