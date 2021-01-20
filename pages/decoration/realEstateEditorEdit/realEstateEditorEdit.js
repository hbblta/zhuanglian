// pages/decoration/realEstateEditorEdit/realEstateEditorEdit.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    styleListText: [],
    styleList: [],
    styleData: {
      styleText: '',
      effectName: '',
      style: '',
      area: '',
      vrImageUrl: '',
      styleImage: [],
      materials: [],
      auxiliaryCost: '',
      EffectImages : []
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!app.globalData.styleListData.styleData) {
      app.globalData.styleListData.styleData = {
        materials: [],
        auxiliaryCost: ''
      }
      console.log('新增')
    } else {
      this.setData({
        styleData: app.globalData.styleListData.styleData
      })
      console.log('编辑')
    }
    this.getStylePicker()
  },
  bindPickerChange: function (e) {
    this.setData({
      'styleData.styleText': this.data.styleListText[e.detail.value],
      'styleData.style': this.data.styleList[e.detail.value].value,
    })
  },
  goUrl(e) {
    var url = e.currentTarget.dataset.url
    if(url=='/pages/decoration/renderingsDetails/renderingsDetails' && e.currentTarget.dataset.index != undefined){//编辑
      console.log(e.currentTarget.dataset.index)
      url = `/pages/decoration/renderingsDetails/renderingsDetails?SpaceID=${this.data.styleData.EffectImages[e.currentTarget.dataset.index].SpaceID}&SpaceName=${this.data.styleData.EffectImages[e.currentTarget.dataset.index].SpaceName}&EffectIndex=${e.currentTarget.dataset.index}`
      app.globalData.renderingsContent = this.data.styleData.EffectImages[e.currentTarget.dataset.index].Content
    }
    app.goUrl(url)
  },
  goBack() {
    wx.navigateBack({
      delta: 1,
    })
  },
  getStylePicker() { //获取样式列表
    app.ajaxToken('/common/getstyles', 'get').then(res => {
      this.setData({
        styleListText: res.data.map((data) => {
          return data.text
        }),
        styleList: res.data
      })
    })
  },
  updateInput(e) {
    var styleData = JSON.parse(JSON.stringify(this.data.styleData))
    styleData[e.currentTarget.dataset.key] = e.detail.value
    this.setData({
      styleData
    })
  },
  getImagePath(e) {
    this.setData({
      'styleData.styleImage': e.detail.imageList
    })
  },
  deleteRender(e){
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定删除吗',
      success (res) {
        if (res.confirm) {
          var EffectImagess = that.data.styleData.EffectImages
          that.data.styleData.EffectImages.splice(e.currentTarget.dataset.index,1)
          that.setData({
            'styleData.EffectImages' : EffectImagess,
          })
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
    let that = this;
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];
    if (currPage.data.EffectImagesData) {
      if(currPage.data.EffectIndex){//编辑
        console.log('编辑')
        let EffectKey = `styleData.EffectImages[${currPage.data.EffectIndex}]`
        that.setData({
          [EffectKey] : currPage.data.EffectImagesData,
          EffectIndex : null,
          EffectImagesData : null
        });
      }else{//新增
        console.log('新增')
        let EffectData = that.data.styleData.EffectImages
        EffectData.push(currPage.data.EffectImagesData)
        that.setData({
          'styleData.EffectImages' : EffectData,
          EffectImagesData : null
        });
      }
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
    var that = this;
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    let update = `formData.unitList[${app.globalData.styleListData.unitIndex}].styleList[${app.globalData.styleListData.styleIndex}]`
    prevPage.setData({
      [update]: that.data.styleData,
    })
    app.globalData.styleListData.styleData = false
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