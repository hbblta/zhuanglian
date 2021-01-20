// pages/decoration/newBannerList/newBannerList.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData : {
      shopAdvId : '',
      image : '',
      isValid : 1,
      imageUrl : '',
      content : ''
    },
    id : '',
    imageType : 'top'
  },
  upload(e) {//上传图片
    var that = this;
    wx.chooseImage({
      count: 1, 
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        app.goUrl('/pages/ordinary/imageCropper/imageCropper?imagUrl='+res.tempFilePaths[0]+'&imageType='+e.currentTarget.dataset.type+'&imageSize=rectangle')
        that.setData({
          imageType : e.currentTarget.dataset.type
        })
      }
    })
  },
  initImg(){
    if(app.globalData.cropperImg != '' && this.data.imageType == app.globalData.cropperImg.imageType){
      this.setData({
        'formData.image' : app.globalData.cropperImg.SaveName,
        'formData.imageUrl' : app.globalData.cropperImg.FileUrl,
      })
      setTimeout(()=>{
        app.globalData.cropperImg = ''
      },400)
    }
  },
  goUrl(e){
    app.goUrl(e.currentTarget.dataset.url)
  },
  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
      if(that.data.formData.content){
        that.editorCtx.setContents({
          html:that.data.formData.content
        });
      }
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
      'formData.content' : e.detail.html
    })
  },
  submit(e){
    var data = {
      image : this.data.formData.image,
      isValid : 1,
      imageUrl : this.data.formData.imageUrl,
      content : this.data.formData.content
    }
    if(this.data.formData.shopAdvId){
      data.shopAdvId = this.data.formData.shopAdvId
    }
    app.ajaxToken('/shop/addshopadv/'+app.globalData.userData.ShopID, data, 'post').then(res => {
      wx.showToast({
        title: '保存成功',
        mask : true
      })
      setTimeout(()=>{
        wx.navigateBack({
          delta: 1,
        })
      },500)
    })
  },
  getBannerDetails(){
    app.ajaxToken('/shop/getadvdetail/'+app.globalData.userData.ShopID+'/'+this.data.id, '', 'get').then(res => {
      this.setData({
        formData : res.data
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id){
      this.setData({
        id : options.id
      })
      this.getBannerDetails()
    }
    this.onEditorReady()
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