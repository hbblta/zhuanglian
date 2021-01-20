// pages/decoration/houseDetails/houseDetails.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    houseId : '',
    houseData : {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      houseId : options.houseId
    })
    this.getHouseData()
  },
  goCaseDetails(e){
    app.goUrl('/pages/decoration/caseDetails/caseDetails?styleId='+e.currentTarget.dataset.id+'&id='+app.globalData.userData.ShopID)
  },
  getHouseData(){
    app.ajaxToken('/store/gethousedetail/'+app.globalData.userData.ShopID+'/'+this.data.houseId, '', 'get').then(res => {
      this.setData({
        houseData : res.data
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