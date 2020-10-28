// pages/ordinary/decorationStaff/decorationStaff.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userData : {},
    areaId : '',
    fromData:{
      shopNo : '',
      realName : ''
    },
    selecteUser : true,
    code:'',
    ajaxUrl : ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      ajaxUrl : options.costType == 1 ? '/user/registerstaff' : '/user/registermaterialstaff'
    })
    var that = this
    wx.setNavigationBarTitle({
      title: '申请'
    })
    this.setData({
      userData : app.globalData.userData
    })
    wx.login({
      success: res => {
        that.setData({
          code : res.code
        })
      }
    })
  },
  updateInput(e) {
    var fromData = JSON.parse(JSON.stringify(this.data.fromData))
    fromData[e.currentTarget.dataset.key] = e.detail.value
    this.setData({
      fromData : fromData
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  selecteChange(){//用户协议
    this.setData({
      selecteUser : !this.data.selecteUser
    })
  },
  changearea(e){
    this.setData({
      areaId : e.detail.id
    })
  },
  registerStaff(e){
    var that = this
    if(this.data.fromData.shopNo == ''){
      wx.showToast({
        title: '请填写装企店码',
        icon :'none'
      })
      return
    }
    if(this.data.fromData.realName == ''){
      wx.showToast({
        title: '请填写申请人',
        icon :'none'
      })
      return
    }
    if(!this.data.selecteUser){
      wx.showToast({
        title: '请勾选用户条款',
        icon :'none'
      })
      return
    }
    var data = {}
    if(!this.data.userData.Mobile){
      if (!e.detail.encryptedData) {
        wx.showToast({
          title: '请授权手机号',
          icon: 'none'
        })
        return
      }
      var data = {
        userId : this.data.userData.UserID,
        shopNo : this.data.fromData.shopNo,
        realName : this.data.fromData.realName,
        encryptedData:e.detail.encryptedData,
        iv : e.detail.iv,
        code:this.data.code
      }
    }else{
      var data = {
        userId : this.data.userData.UserID,
        shopNo : this.data.fromData.shopNo,
        realName : this.data.fromData.realName,
      }
    }
    app.ajaxToken(this.data.ajaxUrl, data, 'post').then(res => {
      if(res.status == 0){
        wx.showToast({
          title: res.msg,
        })
      }
    })
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