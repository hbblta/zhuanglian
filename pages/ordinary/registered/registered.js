// pages/ordinary/registered/registered.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '登录',
    })
    wx.setNavigationBarColor({
      backgroundColor: '#0081FF',
      frontColor: '#ffffff'
    })
  },
  setRegistered(){
    var that = this
    // 获取用户信息
    let data = {
      encryptedData: '',
      code: '',
      signature: '',
      iv: '',
      commendId: '',
      shopId: ''
    }
    // 登录
    console.log(1)
    wx.login({
      success: res => {
        console.log(2)
        data.code = res.code
        wx.getUserInfo({
          success: res => {
            console.log(3)
            data.encryptedData = res.encryptedData
            data.signature = res.signature
            data.iv = res.iv
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            if (this.userInfoReadyCallback) {
              this.userInfoReadyCallback(res)
            }
            var userToken = {
              userName: 'decoration',
              password: 'decoration'
            }
            wx.showLoading({
              title: '登录中',
              mask: true,
            })
            app.ajaxToken('/v1.0/account/gettoken', userToken, 'post').then(res => {
              app.globalData.Authorization = `${res.data.type+' '+res.data.token}`
              app.ajaxToken('/v1.0/account/register', data, 'post').then(ress => {
                app.setGlobalData({
                  userData: ress.data
                })
                wx.hideLoading()
                wx.navigateBack({
                  delta: 1
                })
              })
            })
          }
        })
      }
    })


    // app.setGlobalData({
    //   userData : {
    //     name : '三七'
    //   }
    // })
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