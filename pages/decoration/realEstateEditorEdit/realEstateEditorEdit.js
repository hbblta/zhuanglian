// pages/decoration/realEstateEditorEdit/realEstateEditorEdit.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
     styleListText : [],
     styleList : [],
     styleData : {
      effectName : '',
      style : '',
      area : '',
      vrImageUrl : '',
      styleImage : [],
      materials : [],
      auxiliaryCost : ''
     }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(!app.globalData.styleListData.styleData){
      app.globalData.styleListData.styleData = {
        materials : [],
        auxiliaryCost : ''
      }
      console.log('新增')
    }else{
      this.setData({
        styleData : app.globalData.styleListData.styleData
      })
      console.log('编辑')
    }
    this.getStylePicker()
  },
  bindPickerChange: function(e) {
    this.setData({
      'styleData.effectName' :  this.data.styleListText[e.detail.value],
      'styleData.style' : this.data.styleList[e.detail.value].value,
    })
  },
  goUrl(e){
    app.goUrl(e.currentTarget.dataset.url)
  },
  getStylePicker(){//获取样式列表
    app.ajaxToken('/common/getstyles', 'get').then(res => {
      this.setData({
        styleListText : res.data.map((data)=>{return data.text}),
        styleList : res.data
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
  getImagePath(e){
    this.setData({
      'styleData.styleImage' : e.detail.imageList
    })
  },
  saveStyle(){
    console.log(this.data.styleData)
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
    var that=this;
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