// pages/decoration/addressLibrary/addressLibrary.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Addresses : []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      Addresses : JSON.parse(JSON.stringify(app.globalData.Addresses))
    })
  },
  updateInput(e) {
    var fromDataKey = `Addresses[${e.currentTarget.dataset.index}].${e.currentTarget.dataset.key}`
    console.log(fromDataKey)
    this.setData({
     [fromDataKey] : e.detail.value
    })
  },
  addNewSytle(){
    var Addresses = this.data.Addresses
    Addresses.push({
      ShopName : '',
      Address : '',
      Telphone : ''
    })
    this.setData({
      Addresses
    })
    console.log(app.globalData.Addresses)
  },
  delete(e){//删除图片
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定删除吗',
      success (res) {
        if (res.confirm) {
          var Addresses = that.data.Addresses
          Addresses.splice(e.currentTarget.dataset.index,1)
          that.setData({
            Addresses
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  submit(){
    app.globalData.Addresses = this.data.Addresses
    wx.navigateBack({
      delta: 1,
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