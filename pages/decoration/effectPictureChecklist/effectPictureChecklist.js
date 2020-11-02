// pages/decoration/effectPictureChecklist/effectPictureChecklist.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0,
    textList : [],
    windowHeight : 0,
    list : [],
    auxiliaryCost : ''
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
    app.ajaxToken('/common/getcategories', 'get').then(res => {
      var arr = res.data
      for(let i in arr){
        app.globalData.styleListData.styleData.materials[i] = []
        arr[i].name = arr[i].text
      }
      this.setData({
        textList : arr,
        auxiliaryCost : app.globalData.styleListData.styleData.auxiliaryCost
      })
    })
    wx.showToast({
      icon:'none',
      title: '暂只支持选择辅材',
    })
  },
  goUrl(e){
    app.goUrl(e.currentTarget.dataset.url)
  },
  getList(e){
    this.setData({
      index : e.detail.index,
    })
    this.reshList()
  },
  reshList(){
    this.setData({
      list : app.globalData.styleListData.styleData.materials[this.data.index]
    })
  },
  priceEffect(e){
    app.globalData.styleListData.styleData.auxiliaryCost = e.detail.value
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
    this.reshList()
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