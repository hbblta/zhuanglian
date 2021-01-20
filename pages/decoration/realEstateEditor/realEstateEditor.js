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
    CaseID : null,
    houseList : [
      {
        textList : ['室','一室','二室','三室','四室','五室','六室','七室',],
        index : 0,
      },
      {
        textList : ['厅','一厅','二厅','三厅','四厅','五厅','六厅','七厅',],
        index : 0,
      },
      {
        textList : ['卫','一卫','二卫','三卫','四卫','五卫','六卫','七卫',],
        index : 0,
      },
      {
        textList : ['厨','一厨','二厨','三厨','四厨','五厨','六厨','七厨',],
        index : 0,
      },
      {
        textList : ['阳台','一阳台','二阳台','三阳台','四阳台','五阳台','六阳台','七阳台',],
        index : 0,
      },
    ],
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
    var keyTitle = `formData.unitList[${this.data.textListIndex}].title`
    this.setData({
      [keyTitle] : e.detail.value
    })
  },
  unitListAreaChange(e){
    var keyTitle = `formData.unitList[${this.data.textListIndex}].Area`
    this.setData({
      [keyTitle] : e.detail.value
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
        Area : '',
        styleList : [],
        houseList : JSON.parse(JSON.stringify(that.data.houseList)),
        houseText : ''
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
    if(arrOne.length == 0){
      wx.showToast({
        title: '请至少添加一个户型',
        icon : 'none'
      })
      return
    }
    for(let i in arrOne){//解析户型列表更变为后台数据格式,forEach只能return出当前循环，此处改为for循环
      if(arrOne[i].styleList.length == 0){
        wx.showToast({
          title: '请至少给每个户型添加一个风格',
          icon : 'none'
        })
        return false
      }
      data.houses[i] = {
        houseName : arrOne[i].title,
        Area : arrOne[i].Area,
        HouseNo : arrOne[i].houseText,
        images : arrOne[i].imageList.map(data=>{return data.SaveName}),
        styles : that.changeStyleList(arrOne[i].styleList)
      }
      if(that.data.CaseID){//编辑状态需添加对应ID
        data.houses[i].HouseID = arrOne[i].HouseID
      }
    }
    if(this.data.CaseID){//编辑状态需添加对应ID
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
  changeStyleList(setleData){//解析对应户型风格列表
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
        materials : that.changeMaterialsList(item2.materials),
        EffectImages : []
      }
      for(let i in item2.EffectImages){
        data2[index2].EffectImages[i] = {
          Content : item2.EffectImages[i].Content,
          SpaceID : item2.EffectImages[i].SpaceID
        }
      }
      if(that.data.CaseID){
        data2[index2].StyleID = item2.StyleID
      }
    });
    return data2
  },
  changeMaterialsList(materialsData){//解析材料清单数组
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
      res.data.Houses.forEach((item,index)=>{//解析服务器数据第一层，更变户型数据为可渲染列表
        formData.unitList[index] = {
          title : item.HouseName,
          Area : item.Area,
          houseText : item.HouseNo,
          houseList : JSON.parse(JSON.stringify(that.data.houseList)),
          imageList : that.mergeImg(item.ImageUrl,item.Image),
          styleList : [],
          HouseID : item.HouseID
        }
        item.Styles.forEach((item2,index2)=>{
          formData.unitList[index].styleList[index2] = {
            area : item2.Area,
            auxiliaryCost : item2.AuxiliaryCost,
            effectName : item2.EffectName,
            style : item2.Style,
            styleImage : that.mergeImg(item2.StyleImageUrl,item2.StyleImage),
            vrImageUrl : item2.VRImageUrl,
            StyleID : item2.StyleID,
            EffectImages : item2.EffectImages && item2.EffectImages.length > 0 ? item2.EffectImages : []
          }
          formData.unitList[index].styleList[index2].materials = [[],[],[],[],[]]
          try {
            item2.SpaceMaterials[0].Materials.forEach((item3,index3)=>{
              if(!item3.SpaceID){
                item3.selected = true
                formData.unitList[index].styleList[index2].materials[0].push(item3)
              }
            })
          } catch (error) {
            console.log(error+'材料清单为空')
          }
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
  bindHouseList(e){
    console.log(e)
    var keyIndex = `formData.unitList[${this.data.textListIndex}].houseList[${e.currentTarget.dataset.index}].index`
    var keyText =  `formData.unitList[${this.data.textListIndex}].houseText`
    var nowText = ''
    this.setData({
      [keyIndex]: e.detail.value,
    })
    this.data.formData.unitList[this.data.textListIndex].houseList.forEach(item => {
      nowText = item.index && item.index != '0'? item.textList[item.index] + nowText : nowText
    });
    this.setData({
      [keyText]: nowText,
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