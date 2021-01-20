// pages/ordinary/userEdit/userEdit.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData : {
      Avatar : '',
      RealName : '',
      Mobile : '',
      CustomerService : '',
      CustomerServiceUrl : ''
    },
    getDataUrl : '',
    setDataUrl : ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      setDataUrl : app.globalData.nowUserType.type2 ? '/shop/updateinfo/'+app.globalData.userData.ShopID : '/materialshop/updateinfo/'+app.globalData.userData.MaterialShopID,
      getDataUrl : app.globalData.nowUserType.type2 ? '/shop/getinfo/'+app.globalData.userData.ShopID : '/materialshop/getinfo'+app.globalData.userData.MaterialShopID
    })
    this.getFormData()
  },
  getFormData(){
    app.ajaxToken(this.data.getDataUrl,'', 'get').then(res => {
      this.setData({
        formData : res.data
      })
    })
  },
  updateInput(e) {
    var fromDataKey = `formData.${e.currentTarget.dataset.key}`
    this.setData({
     [fromDataKey] : e.detail.value
    })
  },
  upload(e) {//上传图片
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        app.goUrl('/pages/ordinary/imageCropper/imageCropper?imagUrl='+res.tempFilePaths[0]+'&imageType='+e.currentTarget.dataset.type)
      }
    })
  },
  initImg(){
    if(app.globalData.cropperImg != ''){
      if(app.globalData.cropperImg.imageType == 'avatar'){
        this.setData({
          'formData.Avatar' : app.globalData.cropperImg.FileUrl,
        })
      }else{
        this.setData({
          'formData.CustomerService' : app.globalData.cropperImg.SaveName,
          'formData.CustomerServiceUrl' : app.globalData.cropperImg.FileUrl
        })
      }
      setTimeout(()=>{
        app.globalData.cropperImg = ''
      },400)
    }
  },
  goUrl(e){
    app.goUrl(e.currentTarget.dataset.url)
  },
  submit(){
    wx.showLoading({
      title: '保存中',
      mask:true
    })
    var data = {
      Avatar : this.data.formData.Avatar,
      RealName : this.data.formData.RealName,
      Mobile : this.data.formData.Mobile,
      CustomerService : this.data.formData.CustomerService,
    }
    app.ajaxToken(this.data.setDataUrl,data, 'post').then(res => {
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
  outAccount(){
    wx.showModal({
      title: '提示',
      content: '确定退出当前账号吗',
      success (res) {
        if (res.confirm) {
          wx.clearStorage()
          app.globalData.userData = {}
          app.globalData.nowUserType = {
            type1: true, //普通会员
            type2: false, //装企店主
            type3: false, //材料商店主
            type4: false, //装企员工
            type5: false, //材料商员工
            type6: false, //服务经理
            type7: false, //装企分销员
          },
          setTimeout(()=>{
            wx.navigateBack({
              delta: 1,
            })
          },1000)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
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
    this.initImg()
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