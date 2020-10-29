// pages/decoration/auxiliaryRelease/auxiliaryRelease.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    httpUrl : [],
    uploadImgList: [],
    fromData : {
      materialName : '',
      brand : '',
      modelNubmer : '',
      content : '',
      isGround : false
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
      'fromData.isGround' : !this.data.fromData.isGround
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
      'fromData.content' : e.detail.html
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
    var fromData = JSON.parse(JSON.stringify(this.data.fromData))
    fromData[e.currentTarget.dataset.key] = e.detail.value
    this.setData({
      fromData : fromData
    })
  },
  getImagePath(e){//获取组件图片
    this.setData({
      uploadImgList  : e.detail
    })
  },
  submit(){//提交
    var that = this
    wx.showLoading({
      title: '提交中',
      mask: true
    })
    this.callback(this.data.uploadImgList,(res)=>{
      var data = {
        materialName : this.data.fromData.materialName,
        categoryID : this.data.getcategoriesList[this.data.getcategoriesShowIndex].value,
        brand : this.data.fromData.brand,
        modelNubmer : this.data.fromData.modelNubmer,
        content : this.data.fromData.content,
        isGround : this.data.fromData.isGround ? 1 : 0,
        images : res
      }
      app.ajaxToken('/shop/addproduct/'+app.globalData.userData.ShopID,data, 'post').then(res => {
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
    })
  },
  callback(list,callFn){//上传图片
    var that = this
    var arr = []
    for(let i in list){
      wx.uploadFile({
        url: app.globalData.httpUrl + '/common/uploadproduct',
        filePath: list[i],
        name: 'file',
        header: {
          "Authorization": app.globalData.Authorization
        },
        success: function (res) {
          arr.push(JSON.parse(res.data).data.SaveName)
          if(list.length - 1 == i){
            callFn(arr)
          }
        }
      })
    }
    //输入你先需要执行完的逻辑
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