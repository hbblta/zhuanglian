// pages/decoration/commission/commission.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    textListIndex:0,
    customerType:0,
    textList : [
      {
        name : '总佣金',
        price:888.76,
        id : 0
      },
      {
        name : '已提现',
        price:8882.76,
        id : 1
      },
      {
        name : '未提现',
        price:8828.76,
        id : 2,
        addStatus:true
      },
      {
        name : '待付提现',
        price:88.76,
        id : 2
      },
      {
        name : '待确认提现',
        price:88852.76,
        id : 2
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
    wx.setNavigationBarTitle({
      title: '佣金管理',
    })
  },
  changeIndex(e){
    this.setData({
      textListIndex : e.currentTarget.dataset.index
    })
    this.getList()
  },
  getList(){
    console.log(this.data.textListIndex)
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