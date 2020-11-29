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
     },
     EffectID : null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(!options.EffectID){
      app.globalData.styleListData = {
        styleData : {
          materials : [],
          auxiliaryCost : ''
        }
      }
      console.log('新增')
    }else{
      this.setData({
        EffectID : options.EffectID
      })
      this.getPictureInfo()
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
    if(this.data.EffectID) data.EffectID = this.data.EffectID
    wx.showLoading({
      title: '提交中',
      mask: true
    })
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
  getPictureInfo(){//编辑初始化
    var that = this
    app.ajaxToken('/shop/geteffectinfo/'+app.globalData.userData.ShopID+'/'+this.data.EffectID,'', 'get').then(res => {
      var styleData = {}
      styleData = {
        area : res.data.Area,
        auxiliaryCost : res.data.AuxiliaryCost,
        effectName : res.data.EffectName,
        isGround : res.data.IsGround ? true : false,
        styleImage : that.mergeImg(res.data.StyleImageUrl,res.data.StyleImage),
        vrImageUrl : res.data.VRImageUrl,
        StyleID : res.data.StyleID
      }
      styleData.materials = [[],[],[],[],[]]
      res.data.SpaceMaterials[0].Materials.forEach((item3,index3)=>{
        if(!item3.SpaceID){
          item3.selected = true
          styleData.materials[0].push(item3)
        }
      })
      app.globalData.styleListData = {
        styleData : {
          materials : styleData.materials,
          auxiliaryCost : res.data.AuxiliaryCost
        }
      }
      that.setData({
        styleData
      })
    })
  },
  mergeImg(fileList,saveList){
    var imageList = []
    fileList.forEach((item,index)=>{
      imageList[index] = {
        FileUrl : item,
        SaveName : saveList[index],
        imageType : -1
      }
    })
    return imageList
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