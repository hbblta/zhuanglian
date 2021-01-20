// pages/decoration/declaration/declaration.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData : {
      RealName : '',
      Mobile : '',
      AreaID : '',
      Address : '',
      Area : '',
      StyleID : '',
      StyleText: '',
      Budget : '',
      Reason : ''
    },
    styleListText : [],
    userId : ''
  },
  updateInput(e) {
    var fromDataKey = `formData.${e.currentTarget.dataset.key}`
    this.setData({
     [fromDataKey] : e.detail.value
    })
  },
  getStylePicker() { //获取样式列表
    app.ajaxToken('/common/getstyles', 'get').then(res => {
      this.setData({
        styleListText: res.data.map((data) => {
          return data.text
        }),
        styleList: res.data
      })
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      'formData.StyleID': this.data.styleList[e.detail.value].value,
      'formData.StyleText' : this.data.styleList[e.detail.value].text
    })
  },
  changearea(e){
    this.setData({
      'formData.AreaID':e.detail.id
    })
  },
  sumbit(){
    var data = {
      RealName : this.data.formData.RealName,
      Mobile : this.data.formData.Mobile,
      AreaID : this.data.formData.AreaID,
      Address : this.data.formData.Address,
      Area : this.data.formData.Area,
      StyleID : this.data.formData.StyleID,
      Budget : this.data.formData.Budget,
      Reason : this.data.formData.Reason,
    }
    app.ajaxToken('/shop/orderdown/'+app.globalData.userData.ShopID+'/'+this.data.userId,data,'post').then(res=>{
      wx.showToast({
        title: res.msg,
      })
      setTimeout(()=>{
        wx.navigateBack()
      },2000)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '报单'
    })
    this.getStylePicker()
    this.setData({
      userId : options.userId
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