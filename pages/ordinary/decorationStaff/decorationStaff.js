// pages/ordinary/decorationStaff/decorationStaff.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userData : {},
    areaId : '',
    selecteUser : true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '申请'
    })
    this.setData({
      userData : app.globalData.userData
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
    if(this.data.company == ''){
      wx.showToast({
        title: '请填写公司名称',
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
    if(!this.data.areaId){
      wx.showToast({
        title: '请选择区域',
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
        shopNo : this.data.decorationBossBuyList[this.data.swiperIndex].CostID,
        companyName : this.data.company,
        areaId : this.data.areaId,
        encryptedData:e.detail.encryptedData,
        iv : e.detail.iv,
        code:this.data.code
      }
    }else{
      var data = {
        userId : this.data.userData.UserID,
        costId : this.data.decorationBossBuyList[this.data.swiperIndex].CostID,
        companyName : this.data.company,
        areaId : this.data.areaId,
      }
    }
    app.ajaxToken('/user/registerstaff', data, 'post').then(res => {
      app.pay(res.data)
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