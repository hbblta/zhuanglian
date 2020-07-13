// pages/tabBar/my/my.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userFeaturesList : [
      {
        ordinaryIcon : '../../../image/icon/ordinary1.png',
        ordinaryTitle : '装修公司',
        ordinaryUrl : '/pages/ordinary/decorationRecording/decorationRecording'
      },
      {
        ordinaryIcon : '../../../image/icon/ordinary2.png',
        ordinaryTitle : '材料商',
        ordinaryUrl : '/pages/ordinary/materialRecording/materialRecording'
      },
      {
        ordinaryIcon : '../../../image/icon/ordinary3.png',
        ordinaryTitle : '装修预定',
        ordinaryUrl : '/pages/ordinary/decorationSchedule/decorationSchedule'
      },
      {
        ordinaryIcon : '../../../image/icon/ordinary4.png',
        ordinaryTitle : '材料预定',
        ordinaryUrl : '/pages/ordinary/materialOrder/materialOrder'
      },
      {
        ordinaryIcon : '../../../image/icon/ordinary5.png',
        ordinaryTitle : '效果收藏',
        ordinaryUrl : '/pages/ordinary/effectCollection/effectCollection'
      },
      {
        ordinaryIcon : '../../../image/icon/ordinary6.png',
        ordinaryTitle : '材料收藏',
        ordinaryUrl : '/pages/ordinary/materialCollection/materialCollection'
      },
      {
        ordinaryIcon : '../../../image/icon/ordinary7.png',
        ordinaryTitle : '我的推广',
        ordinaryUrl : '/pages/ordinary/myPromotion/myPromotion'
      },
      {
        ordinaryIcon : '../../../image/icon/ordinary8.png',
        ordinaryTitle : '施工现场',
        ordinaryUrl : '/pages/ordinary/constructionSite/constructionSite'
      },
      {
        ordinaryIcon : '../../../image/icon/ordinary9.png',
        ordinaryTitle : '我要注册',
        ordinaryUrl : ''
      }
    ]
  },

  goUrl(e){
    app.goUrl(e.currentTarget.dataset.url)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onTabItemTap(item) {
    wx.setNavigationBarTitle({
      title: '我的'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#0081FF',
      // animation: {
      //   duration: 200,
      //   timingFunc: 'easeIn'
      // }
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