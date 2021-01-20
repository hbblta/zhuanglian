// pages/decoration/editShop/editShop.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isGround : false,
    formData : {
      ShopLogo : '',
      ShopLogoUrl : '',
      CompanyName : '',
      Telphone : '',
      Description : '',
      Longitude : '',
      Latitude : '',
      Addresses : []
    },
    imageType : -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.getFormData()
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function(res) {
       that.setData({
        'formData.Latitude' : res.latitude,
        'formData.Longitude' : res.longitude
       })
      }
     })
  },
  getFormData(){
    app.ajaxToken('/shop/getshopinfo/'+app.globalData.userData.ShopID,'', 'get').then(res => {
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
        app.goUrl('/pages/ordinary/imageCropper/imageCropper?imagUrl='+res.tempFilePaths[0]+'&imageType='+that.data.imageType)
      }
    })
  },
  initImg(){
    if(app.globalData.cropperImg != '' && this.data.imageType == app.globalData.cropperImg.imageType){
      this.setData({
        'formData.ShopLogo' : app.globalData.cropperImg.SaveName,
        'formData.ShopLogoUrl' : app.globalData.cropperImg.FileUrl
      })
      setTimeout(()=>{
        app.globalData.cropperImg = ''
      },400)
    }
  },
  changeIsGround(){//上下架更改状态
    this.setData({
      isGround : !this.data.isGround
    })
  },
  goUrl(e){
    if(e.currentTarget.dataset.url == '/pages/decoration/addressLibrary/addressLibrary'){
      app.globalData.Addresses = this.data.formData.Addresses
    }
    app.goUrl(e.currentTarget.dataset.url)
  },
  submit(){
    wx.showLoading({
      title: '保存中',
      mask:true
    })
    
    var data = {
      ShopLogo : this.data.formData.ShopLogo,
      CompanyName : this.data.formData.CompanyName,
      Telphone : this.data.formData.Telphone,
      Description : this.data.formData.Description,
      Addresses : this.data.formData.Addresses,
      Latitude : this.data.formData.Latitude,
      Longitude : this.data.formData.Longitude
    }
    
    console.log(data)
    app.ajaxToken('/shop/updateshopinfo/'+app.globalData.userData.ShopID,data, 'post').then(res => {
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
  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
    }).exec()
  },
  insertImage() {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        wx.uploadFile({
          url: app.globalData.httpUrl + '/common/uploadimage',
          filePath: res.tempFilePaths[0],
          name: 'file',
          header: {
            "Authorization": app.globalData.Authorization
          },
          success: function (res) {
            that.editorCtx.insertImage({
              src: JSON.parse(res.data).data.FileUrl,
              data: {
                id: 'abcd',
                role: 'god'
              },
              width: '100%',
              success: function () {
                console.log('insert image success')
              }
            })
          }
        })
      }
    })
  },
  editorData(e){
    this.setData({
      'formData.Description' : e.detail.html
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
    if(app.globalData.Addresses.length > 0){
      this.setData({
        'formData.Addresses' : app.globalData.Addresses
      })
      app.globalData.Addresses = []
    }
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