// pages/ordinary/editPassword/editPassword.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData : {
      userId : '',
      password : ''
    }
  },
  updateInput(e) {
    var fromDataKey = `formData.${e.currentTarget.dataset.key}`
    this.setData({
     [fromDataKey] : e.detail.value
    })
  },
  submit(){
    wx.showLoading({
      title: '保存中',
      mask:true
    })
    var data = {
      userId : app.globalData.userData.UserID,
      password : this.data.formData.password
    }
    app.ajaxToken('/account/setpassword/',data, 'post').then(res => {
      wx.hideLoading()
      wx.showToast({
        title: '保存成功',
      })
      setTimeout(()=>{
        wx.navigateBack({
          delta: 1,
        })
      },1000)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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