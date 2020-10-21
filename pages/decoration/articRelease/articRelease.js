// pages/decoration/articRelease/articRelease.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getcategoriesShowIndex : -1,
    getcategoriesShow : [],
    getcategoriesList : [],
    fromData : {
      classID : '',
      title : '',
      content : ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onEditorReady()
    wx.setNavigationBarTitle({
      title: '文章发布',
    })
    app.ajaxToken('/common/getnewsclass', '', 'get').then(res => {
      let arr = JSON.parse(res.data).map((data)=>{
        return data.label
      })
      this.setData({
        getcategoriesList : JSON.parse(res.data),
        getcategoriesShow : arr
      })
    })
  },
  updateInput(e) {
    var fromData = JSON.parse(JSON.stringify(this.data.fromData))
    fromData[e.currentTarget.dataset.key] = e.detail.value
    this.setData({
      fromData : fromData
    })
  },
  bindPickerChange(e){
    this.setData({
      getcategoriesShowIndex : e.detail.value
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
              width: '80%',
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
      'fromData.content' : e.detail.html
    })
  },
  submit(){
    if(!this.data.getcategoriesList[this.data.getcategoriesShowIndex].value){
      wx.showToast({
        title: '请选择资讯类别',
        icon : 'none'
      })
      return
    }
    var data = {
      classID : this.data.getcategoriesList[this.data.getcategoriesShowIndex].value,
      title : this.data.fromData.title,
      content : this.data.fromData.content
    }
    app.ajaxToken('/shop/addnews/'+app.globalData.userData.ShopID, data, 'post').then(res => {
     if(res.status == 0){
       wx.navigateBack({
         delta: 1,
       })
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