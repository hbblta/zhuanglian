// pages/decoration/renderingsDetails/renderingsDetails.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getcategoriesShowIndex : -1,
    getcategoriesShow : [],
    getcategoriesList : [],
    formData : {
      SpaceID : '',
      Content : '',
      SpaceName : ''
    },
    EffectIndex : null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.SpaceID){
      this.setData({
        'formData.SpaceID' : options.SpaceID,
        'formData.Content' : app.globalData.renderingsContent,
        'formData.SpaceName' : options.SpaceName,
        EffectIndex : options.EffectIndex
      })
    }
    this.onEditorReady()
    this.initSpaceId()
  },
  initSpaceId(){
    app.ajaxToken('/common/getspaces', '', 'get').then(res => {
      this.setData({
        getcategoriesList : res.data,
        getcategoriesShow : res.data.map((data)=>{return data.text})
      })
    })
  },
  bindPickerChange(e){
    this.setData({
      getcategoriesShowIndex : e.detail.value,
      'formData.SpaceID' : this.data.getcategoriesList[e.detail.value].value,
      'formData.SpaceName' : this.data.getcategoriesShow[e.detail.value]
    })
  },
  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
      if(that.data.formData.Content){
        that.editorCtx.setContents({
          html:that.data.formData.Content
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
      'formData.Content' : e.detail.html
    })
  },
  sumit(){
    if(this.data.formData.SpaceID == '' && this.data.formData.Content == ''){
      wx.showToast({
        title: '请填写完整',
        icon : 'none'
      })
      return
    }
    var that = this
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    prevPage.setData({
      EffectImagesData: that.data.formData,
    });
    if(this.data.EffectIndex){
      prevPage.setData({
        EffectIndex: that.data.EffectIndex,
      });
    }
    wx.navigateBack({
      delta: 1
    })
    console.log(this.data.formData)
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