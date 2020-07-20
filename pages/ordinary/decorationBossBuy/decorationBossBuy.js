// pages/ordinary/decorationBossBuy/decorationBossBuy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    decorationBossBuyList:[
      {
        name : '1年VIP',
        type:1,
        oldPrice:6999,
        nowPrice:699,
        img:'../../../image/testImg/decorationBossBuy1.png',
      },
      {
        name : '1年VIP',
        type:2,
        oldPrice:6999,
        nowPrice:699,
        img:'../../../image/testImg/decorationBossBuy1.png',
      },
      {
        name : '1年VIP',
        type:3,
        oldPrice:6999,
        nowPrice:699,
        img:'../../../image/testImg/decorationBossBuy1.png',
      }
    ],
    swiperIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '注册'
    })
  },
  nowChange(e){
    console.log(e)
    if(e.detail.source){
      this.setData({
        swiperIndex : e.detail.current
      })
    }
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