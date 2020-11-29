// pages/decoration/realEstateEditor/realEstateEditor.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textListIndex:-1,
    windowHeight : 0,
    formData : {
      basisData : {
        propertyName : '',
        isGround : true,
        imageList : []
      },
      unitList : []
    },
    CaseID : null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({  
      success: (res) => {
        this.setData({
          windowHeight: (res.windowHeight * (750 / res.windowWidth))
        })
      },
    })
    wx.setNavigationBarTitle({
      title: '楼盘编辑',
    })
    if(options.CaseID){
      this.setData({
        CaseID : options.CaseID
      })
      this.getCaseInfo()
    }
  },
  goUrl(e){
    if(e.currentTarget.dataset.url == '/pages/decoration/realEstateEditorEdit/realEstateEditorEdit'){
      app.globalData.styleListData = {
        unitIndex : this.data.textListIndex,
        styleIndex : e.currentTarget.dataset.index,
        styleData : this.data.formData.unitList[this.data.textListIndex].styleList[e.currentTarget.dataset.index]
      }
    }
    app.goUrl(e.currentTarget.dataset.url)
  },
  changIndex(e){
    this.setData({
      textListIndex : e.currentTarget.dataset.index
    })
  },
  propertyNameChange(e){
    this.setData({
      'formData.basisData.propertyName' : e.detail.value
    })
  },
  unitListNameChange(e){
    var arr = JSON.parse(JSON.stringify(this.data.formData)).unitList
    arr[this.data.textListIndex].title = e.detail.value
    this.setData({
      'formData.unitList' : arr
    })
  },
  changeIsGround(){//上下架更改状态
    this.setData({
      'formData.basisData.isGround' : !this.data.formData.basisData.isGround
    })
  },
  getImagePath(e){//获取组件图片
    if(e.detail.imageType < 0){
      this.setData({
        'formData.basisData.imageList' : e.detail.imageList
      })
    }else{
      var arr = JSON.parse(JSON.stringify(this.data.formData)).unitList
          arr[e.detail.imageType].imageList = e.detail.imageList
      this.setData({
        'formData.unitList' : arr,
      })
    }
  },
  moreUnit(){//新增户型
    var that = this
    this.setData({
      'formData.unitList' : this.data.formData.unitList.concat([{
        imageList : [],
        title : '',
        styleList : []
      }])
    })
  },
  deleteUnit(e){//删除户型
    var that = this
    wx.showLoading({
      title: '删除中',
    })
    setTimeout(()=>{
      wx.hideLoading({
        success: (res) => {
          var arr = JSON.parse(JSON.stringify(that.data.formData.unitList))
          arr.splice(e.currentTarget.dataset.index,1)
          that.setData({
            'formData.unitList' : arr,
            textListIndex : -1
          })
          wx.showToast({
            title: '删除成功',
          })
        },
      })
    },500)
  },
  addNewSytle(){//新增风格
    var that = this
    var updata = `formData.unitList[${this.data.textListIndex}].styleList`
    this.setData({
        [updata] : that.data.formData.unitList[this.data.textListIndex].styleList.concat([false])
    })
  },
  deleteStyle(e){//删除风格
    var that = this
    wx.showLoading({
      title: '删除中',
    })
    setTimeout(()=>{
      wx.hideLoading({
        success: (res) => {
          var arr = JSON.parse(JSON.stringify(that.data.formData.unitList))[this.data.textListIndex].styleList
          var updata = `formData.unitList[${this.data.textListIndex}].styleList`
          arr.splice(e.currentTarget.dataset.index,1)
          that.setData({
            [updata] : arr,
          })
          wx.showToast({
            title: '删除成功',
          })
        },
      })
    },500)
  },
  submit(){//提交
    var that = this
    wx.showLoading({
      title: '提交中',
      mask: true
    })
    var data = {
      caseName : this.data.formData.basisData.propertyName,
      images : this.data.formData.basisData.imageList.map(data=>{return data.SaveName}),
      isGround : this.data.formData.basisData.isGround ? 1 : 0,
      houses : []
    }
    var arrOne = JSON.parse(JSON.stringify(this.data.formData.unitList))
    arrOne.forEach((item1,index1) => {
      data.houses[index1] = {
        houseName : item1.title,
        images : item1.imageList.map(data=>{return data.SaveName}),
        styles : that.changeStyleList(item1.styleList)
      }
      if(that.data.CaseID){
        data.houses[index1].HouseID = item1.HouseID
      }
    });
    if(this.data.CaseID){
      data.CaseID = this.data.CaseID
    }
    app.ajaxToken('/shop/addcase/'+app.globalData.userData.ShopID,data, 'post').then(res => {
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
  changeStyleList(setleData){
    var that = this
    var data2 = []
    setleData.forEach((item2,index2) => {
      data2[index2] = {
        effectName : item2.effectName,
        area : item2.area,
        style : item2.style,
        styleImage : item2.styleImage.map(data=>{return data.SaveName}),
        vrImageUrl : item2.vrImageUrl,
        auxiliaryCost : item2.auxiliaryCost,
        materials : that.changeMaterialsList(item2.materials)
      }
      if(that.data.CaseID){
        data2[index2].StyleID = item2.StyleID
      }
    });
    return data2
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
  getCaseInfo(){//编辑初始化
    var that = this
    app.ajaxToken('/shop/getcaseinfo/'+app.globalData.userData.ShopID+'/'+this.data.CaseID, 'get').then(res => {
      var formData = {
        basisData : {},
        unitList : []
      }
      formData.basisData = {
        imageList : that.mergeImg(res.data.ImageUrl,res.data.Image),
        isGround : res.data.IsGround ? true : false,
        propertyName : res.data.CaseName,
      }
      res.data.Houses.forEach((item,index)=>{
        formData.unitList[index] = {
          title : item.HouseName,
          imageList : that.mergeImg(item.ImageUrl,item.Image),
          styleList : [],
          HouseID : item.HouseID
        }
        console.log(item.Styles)
        item.Styles.forEach((item2,index2)=>{
          formData.unitList[index].styleList[index2] = {
            area : item2.Area,
            auxiliaryCost : item2.AuxiliaryCost,
            effectName : item2.EffectName,
            style : item2.Style,
            styleImage : that.mergeImg(item2.StyleImageUrl,item2.StyleImage),
            vrImageUrl : item2.VRImageUrl,
            StyleID : item2.StyleID
          }
          formData.unitList[index].styleList[index2].materials = [[],[],[],[],[]]
          item2.SpaceMaterials[0].Materials.forEach((item3,index3)=>{
            if(!item3.SpaceID){
              item3.selected = true
              formData.unitList[index].styleList[index2].materials[0].push(item3)
            }
          })
        })
      })
      this.setData({
        formData
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