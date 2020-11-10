// pages/material/auxiliaryRelease/auxiliaryRelease.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uploadImgList: [],
    formData : {
      materialName : '',
      memberPrice : '',
      marketPrice : '',
      unit : '',
      brand : '',
      modelNubmer : '',
      content : '',
      isGround : true,
      imageList : []
    },
    getcategoriesList : [],
    getcategoriesShow : [],
    getcategoriesShowIndex : -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onEditorReady()
    wx.setNavigationBarTitle({
      title: '辅材发布',
    })
    app.ajaxToken('/common/getcategories', '', 'get').then(res => {
      let arr = res.data.map((data)=>{
        return data.text
      })
      this.setData({
        getcategoriesList : res.data,
        getcategoriesShow :arr
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  changeIsGround(){
    this.setData({
      'formData.isGround' : !this.data.formData.isGround
    })
  },
  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
    }).exec()
  },
  editorData(e){
    this.setData({
      'formData.content' : e.detail.html
    })
  },
  insertImage() {
    const that = this
    wx.chooseImage({
      count: 1,
      success: function (res) {
        that.editorCtx.insertImage({
          src: res.tempFilePaths[0],
          data: {
            id: 'abcd',
            role: 'god'
          },
          width: '80%',
          success: function () {
            console.log('insert image success')
          }
        })
      }
    })
  },
  bindPickerChange(e){
    this.setData({
      getcategoriesShowIndex : e.detail.value
    })
  },
  updateInput(e) {
    var formData = JSON.parse(JSON.stringify(this.data.formData))
    formData[e.currentTarget.dataset.key] = e.detail.value
    this.setData({
      formData : formData
    })
  },
  getImagePath(e){//获取组件图片
    this.setData({
      'formData.imageList' : e.detail.imageList
    })
  },
  submit(){//提交
    var that = this
    wx.showLoading({
      title: '提交中',
      mask: true
    })
    var data = {
      materialName : this.data.formData.materialName,
      unit : this.data.formData.unit,
      memberPrice : this.data.formData.memberPrice,
      marketPrice : this.data.formData.marketPrice,
      categoryID : this.data.getcategoriesList[this.data.getcategoriesShowIndex].value,
      brand : this.data.formData.brand,
      modelNubmer : this.data.formData.modelNubmer,
      content : this.data.formData.content,
      isGround : this.data.formData.isGround ? 1 : 0,
      images : this.data.formData.imageList.map((data)=>{return data.SaveName})
    }
    app.ajaxToken('/materialshop/addproduct/'+app.globalData.userData.MaterialShopID,data, 'post').then(res => {
      wx.hideLoading()
      wx.showToast({
        title: '发布成功',
      })
      setTimeout(()=>{
        wx.navigateBack({
          delta: 1,
        })
      },1000)
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