// pages/decoration/decorationCalculator/decorationCalculator.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgData : {
      topImage : '',
      bottomImage : ''
    },
    imgShow:{
      topImage : '',
      bottomImage : ''
    },
    calaData : {
      budgetName : '',
      price : ''
    },
    calaPrice : '',
    type : '',
    pickInex : -1,
    pickerListText : [],
    calaList : [],
    area : '',
    code : '',
    userData : {},
    phoneList : ['139***6905','138***2382','189***6635','180***9841','150***6023','177***0653','187***6685','139***5100','181***9010','139***5456'],
    imageType : '',
    ShopID : ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options)
    this.setData({
      ShopID : options.ShopID
    })
    wx.setNavigationBarTitle({
      title: '装修计算器',
    })
    this.getShopkeeper()
    this.setData({
      type : options.type,
      userData : app.globalData.userData
    })
    this.getCalaPrice()
    wx.login({
      success: res => {
        that.setData({
          code : res.code
        })
      }
    })
  },
  upload(e) {//上传图片
    var that = this;
    wx.chooseImage({
      count: 1, 
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        app.goUrl('/pages/ordinary/imageCropper/imageCropper?imagUrl='+res.tempFilePaths[0]+'&imageType='+e.currentTarget.dataset.type+'&imageSize=rectangle')
        that.setData({
          imageType : e.currentTarget.dataset.type
        })
      }
    })
  },
  initImg(){
    if(app.globalData.cropperImg != '' && this.data.imageType == app.globalData.cropperImg.imageType){
        if(app.globalData.cropperImg.imageType == 'top'){
          this.setData({
            'imgData.topImage' : app.globalData.cropperImg.SaveName,
            'imgShow.topImage' : app.globalData.cropperImg.FileUrl,
          })
        }else{
          this.setData({
            'imgData.bottomImage' : app.globalData.cropperImg.SaveName,
            'imgShow.bottomImage' : app.globalData.cropperImg.FileUrl
          })
        }
      setTimeout(()=>{
        app.globalData.cropperImg = ''
      },400)
    }
  },
  goUrl(e){
    app.goUrl(e.currentTarget.dataset.url)
  },
  submit(e){
    var imgDatas = {
      topImage : this.data.imgData.topImage,
      bottomImage : this.data.imgData.bottomImage,
    }
    app.ajaxToken('/shop/savebudgetadv/'+this.data.ShopID, imgDatas, 'post').then(res => {
      wx.showToast({
        title: '保存成功',
        icon : 'none'
      })
      setTimeout(()=>{
        wx.navigateBack({
          delta: 1,
        })
      },500)
    })
  },
  submitUser(){
    var data = {
      UserID: app.globalData.userData.UserID,
      BudgetID: this.data.calaList[this.data.pickInex].value,
      Area: this.data.area,
    }
    app.ajaxToken('/store/freebudget/'+this.data.ShopID, data, 'post').then(res => {
      setTimeout(()=>{
        wx.navigateBack({
          delta: 1,
        })
      },500)
    })
  },
  changeArea(e){
    this.setData({
      area : e.detail.value
    })
  },
  getCalaPrice(){
    this.setData({
      calaPrice : Math.ceil(Math.random()*100000)  
    })
    setTimeout(()=>{
      this.getCalaPrice()
    },4000)
  },
  getShopkeeper(){
    app.ajaxToken('/store/getbudgetlist/'+this.data.ShopID, '', 'get').then(res => {
      this.setData({
        'imgShow.topImage.' : res.data.BudgetTopImageUrl,
        'imgShow.bottomImage.' : res.data.BudgetBottomImageUrl,
        calaList : res.data.BudgetList,
        pickerListText : res.data.BudgetList.map(data=>{return data.text})
      })
    })
  },
  bindPickerChange(e){
    this.setData({
      pickInex : e.detail.value
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
    this.initImg()
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