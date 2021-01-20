// pages/decoration/cooperativeConfirm/cooperativeConfirm.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    decorationArray:{
      textList: ['放弃原因1','放弃原因2','放弃原因3','放弃原因4'],
      idList: [0,1,2,3]
     },
     cooperationData : {}
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var data = {
      AuditID : this.data.cooperationData.AuditID,
      Reason : this.data.decorationArray.textList[e.detail.value]
    }
    app.ajaxToken('/shop/cooperationback/'+app.globalData.userData.ShopID,data,'post').then(res=>{
      if(res.status == 0){
        wx.showToast({
          title: res.msg,
        })
        wx.navigateBack({
          delta: 1,
        })
      }
    })
  },
  goUrl(e){
    app.goUrl(e.currentTarget.dataset.url)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      cooperationData : app.globalData.cooperationData
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