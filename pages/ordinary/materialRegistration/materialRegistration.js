// pages/ordinary/materialRegistration/materialRegistration.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData:{
      companyName : '',
      brandName : '',
      realName : '',
      areaId : ''
    },
    selecteUser:true,
    userData:{},
    code : ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.setNavigationBarTitle({
      title: '材料商注册'
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
  changearea(e){
    this.setData({
      'formData.areaId' : e.detail.id
    })
  },
  selecteChange(){//用户协议
    this.setData({
      selecteUser : !this.data.selecteUser
    })
  },
  updateInput(e) {//公用input更改formData
    var formData = JSON.parse(JSON.stringify(this.data.formData))
    formData[e.currentTarget.dataset.key] = e.detail.value
    this.setData({
      formData : formData
    })
  },
  submit(e){
    var that = this
    if(!this.data.selecteUser){
      wx.showToast({
        title: '请勾选用户条款',
        icon :'none'
      })
      return
    }
    if(!this.data.formData.companyName || !this.data.formData.brandName || !this.data.formData.realName || !this.data.formData.areaId){
      wx.showToast({
        title: '请先将信息填写完整',
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
        realName : this.data.formData.realName,
        brandName : this.data.formData.brandName,
        companyName : this.data.formData.companyName,
        areaId : this.data.formData.areaId,
        encryptedData:e.detail.encryptedData,
        iv : e.detail.iv,
        code:this.data.code
      }
    }else{
      var data = {
        userId : this.data.userData.UserID,
        realName : this.data.formData.realName,
        brandName : this.data.formData.brandName,
        companyName : this.data.formData.company,
        areaId : this.data.formData.areaId,
      }
    }
    app.ajaxToken('/user/registermaterialshop', data, 'post').then(res => {
      app.setUserInfo(app.globalData.userData.UserID,()=>{
        wx.showToast({
          title: '申请成功',
        })
        setTimeout(()=>{
          wx.navigateBack({
            delta: 2,
          })
        },1000)
      })
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