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
    userData : {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
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
  upload(e) {
    console.log(e.currentTarget.dataset.type)
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
            if(e.currentTarget.dataset.type == 'top'){
              that.setData({
                'imgData.topImage' : JSON.parse(res.data).data.SaveName,
                'imgShow.topImage' : JSON.parse(res.data).data.FileUrl,
              })
            }else{
              that.setData({
                'imgData.bottomImage' : JSON.parse(res.data).data.SaveName,
                'imgShow.bottomImage' : JSON.parse(res.data).data.FileUrl
              })
            }
          }
        })
      }
    })
  },
  goUrl(e){
    app.goUrl(e.currentTarget.dataset.url)
  },
  submit(e){
    if(this.data.type == 'shop'){
      var data = {}
      if(!this.data.userData.Mobile){
        if (!e.detail.encryptedData) {
          wx.showToast({
            title: '请授权手机号',
            icon: 'none'
          })
          return
        }
        data = {
          UserID : app.globalData.userData.UserID,
          BudgetID : this.data.calaList[this.data.pickInex].value,
          Area : this.data.area,
          encryptedData:e.detail.encryptedData,
          iv : e.detail.iv,
          code:this.data.code
        }
      }else{
         data = {
          UserID : app.globalData.userData.UserID,
          BudgetID : this.data.calaList[this.data.pickInex].value,
          Area : this.data.area,
        }
      }
      app.ajaxToken('/store/freebudget/'+app.globalData.userData.ShopID,data, 'post').then(res => {
        console.log(res)
      })
    }else{
      var imgDatas = {
        topImage : this.data.imgData.topImage,
        bottomImage : this.data.imgData.bottomImage,
      }
      var calaDatas = {
        budgetName : '橙色',
        price : 1
      }
      app.ajaxToken('/shop/savebudgets/'+app.globalData.userData.ShopID, calaDatas, 'post').then(res => {})
      app.ajaxToken('/shop/savebudgetadv/'+app.globalData.userData.ShopID, imgDatas, 'post').then(res => {})
    }
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
    app.ajaxToken('/store/getbudgetlist/'+app.globalData.userData.ShopID, '', 'get').then(res => {
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