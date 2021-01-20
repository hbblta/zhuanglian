// pages/ordinary/registered/registered.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: '',//微信登录code
    formData : {
      Mobile : '',
      Password : ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.setNavigationBarTitle({
      title: '登录',
    })
    wx.setNavigationBarColor({
      backgroundColor: '#0081FF',
      frontColor: '#ffffff'
    })
    wx.login({
      success: res => {
        that.setData({
          code : res.code
        })
      }
    })
  },
  bindGetUserInfo(e){
      let data = {
        encryptedData: e.detail.encryptedData,
        code: this.data.code,
        signature: e.detail.signature,
        iv: e.detail.iv,
        commendId: null,
        shopId: null
      }
      var userToken = {
        userName: 'decoration',
        password: 'decoration'
      }
      wx.showLoading({
        title: '登录中',
        mask: true,
      })
      app.ajaxToken('/account/gettoken', userToken, 'post').then(res => {
        app.globalData.Authorization = `${res.data.type+' '+res.data.token}`
        app.initCategoryList()
        app.ajaxToken('/account/register', data, 'post').then(ress => {
          wx.hideLoading()
          if(ress.status == 0){
            wx.showToast({
              title: '登录成功',
            })
            app.setUserInfo(ress.data.UserID,()=>{
              setTimeout((res)=>{
                wx.navigateBack({
                  delta: 1
                })
              },1000)
            })
          }else{
            wx.showToast({
              title: ress.msg,
              icon : 'none'
            })
          }

        })
      })
  },
  setRegistered(e){
    let data = {
      Mobile : this.data.formData.Mobile,
      Password : this.data.formData.Password
    }
    var userToken = {
      userName: 'decoration',
      password: 'decoration'
    }
    wx.showLoading({
      title: '登录中',
      mask: true,
    })
    app.ajaxToken('/account/gettoken', userToken, 'post').then(res => {
      app.initCategoryList()
      app.globalData.Authorization = `${res.data.type+' '+res.data.token}`
      app.ajaxToken('/account/login', data, 'post').then(ress => {
        wx.hideLoading()
        wx.showToast({
          title: '登录成功',
        })
        app.setUserInfo(ress.data.UserID,()=>{
          setTimeout((res)=>{
            wx.navigateBack({
              delta: 1
            })
          },1000)
        })
      })
    })
  },
  updateInput(e) {
    var fromDataKey = `formData.${e.currentTarget.dataset.key}`
    this.setData({
     [fromDataKey] : e.detail.value
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