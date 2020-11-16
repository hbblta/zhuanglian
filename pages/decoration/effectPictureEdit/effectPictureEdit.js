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
      auxiliaryCost : '',
      isGround : true
     }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.styleListData)
    if(!app.globalData.styleListData){
      app.globalData.styleListData = {
        styleData : {
          materials : [],
          auxiliaryCost : ''
        }
      }
      console.log('新增')
    }else{
      // this.setData({
      //   styleData : app.globalData.styleListData.styleData
      // })
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
  changeIsGround(){//上下架更改状态
    this.setData({
      'styleData.isGround' : !this.data.styleData.isGround
    })
  },
  submit(){//提交
    var that = this
    console.log(this.data.styleData)
    wx.showLoading({
      title: '提交中',
      mask: true
    })
    var data = {
      effectName : this.data.styleData.effectName,
      area : this.data.styleData.area,
      styleImage : this.data.styleData.styleImage.map(data=>{return data.SaveName}),
      vrImageUrl : this.data.styleData.vrImageUrl,
      styleID : this.data.styleData.style,
      auxiliaryCost : this.data.styleData.auxiliaryCost,
      isGround :  this.data.styleData.isGround ? 1 : 0,
      materials : that.changeMaterialsList(this.data.styleData.materials)
    }
    console.log(data)
    app.ajaxToken('/shop/addeffect/'+app.globalData.userData.ShopID,data, 'post').then(res => {
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
  changeMaterialsList(materialsData){
    var data3 = []
    var materialsDataList = []
    materialsData.forEach(items=>{
      materialsDataList = materialsDataList.concat(items)
    })
    materialsDataList.forEach((item3,index3) => {
      data3[index3] = {
        materialID : item3.MaterialID,
        spaceID : null,
        quantity : 1,
      }
    });
    return data3
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
    // var that=this;
    // let pages = getCurrentPages();
    // let prevPage = pages[pages.length - 2];
    // let update = `formData.unitList[${app.globalData.styleListData.unitIndex}].styleList[${app.globalData.styleListData.styleIndex}]`
    // prevPage.setData({
    //   [update]: that.data.styleData,
    // })
    app.globalData.styleListData = null
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