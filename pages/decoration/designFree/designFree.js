// pages/ordinary/designFree/designFree.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userData : {},
    formData:{
      area : '',
      realName : ''
    },
    code:'',
    ShopID : '',
    phoneList : ['139***6905','138***2382','189***6635','180***9841','150***6023','177***0653','187***6685','139***5100','181***9010','139***5456'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      ShopID : options.ShopID
    })
    wx.setNavigationBarTitle({
      title: '预约免费设计'
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
    var formData = JSON.parse(JSON.stringify(this.data.formData))
    formData[e.currentTarget.dataset.key] = e.detail.value
    this.setData({
      formData : formData
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  registerStaff(e){
    var that = this
    if(this.data.formData.area == ''){
      wx.showToast({
        title: '请填写面积',
        icon :'none'
      })
      return
    }
    if(this.data.formData.realName == ''){
      wx.showToast({
        title: '请填写姓名',
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
        area : this.data.formData.area,
        realName : this.data.formData.realName,
        encryptedData:e.detail.encryptedData,
        iv : e.detail.iv,
        code:this.data.code
      }
    }else{
      var data = {
        userId : this.data.userData.UserID,
        area : this.data.formData.area,
        realName : this.data.formData.realName,
      }
    }
    wx.showToast({
      icon : 'none',
      title: JSON.stringify(data),
    })
    
    app.ajaxToken('/store/freedesign/'+this.data.ShopID, data, 'post').then(res => {
      if(res.status == 0){
        wx.showToast({
          icon : 'none',
          title: res.msg,
        })
        setTimeout(()=>{
          wx.navigateBack({
            delta: 1,
          })
        },1000)
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