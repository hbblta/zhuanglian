// pages/decoration/myShop/myShop.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopTabList: [{
        title: '主页',
        iconUrl: '../../../image/shopIcon/11.png',
        changeIcon: '../../../image/shopIcon/1.png',
      },
      {
        title: '大厅',
        iconUrl: '../../../image/shopIcon/22.png',
        changeIcon: '../../../image/shopIcon/2.png',
      },
      {
        title: '消息',
        iconUrl: '../../../image/shopIcon/33.png',
        changeIcon: '../../../image/shopIcon/3.png',
      },
      {
        title: '推广',
        iconUrl: '../../../image/shopIcon/44.png',
        changeIcon: '../../../image/shopIcon/4.png',
      },
      // {
      //   title: '会员',
      //   iconUrl: '../../../image/shopIcon/55.png',
      //   changeIcon: '../../../image/shopIcon/5.png',
      // },
    ], //tabbar数组
    imgArr: [],//轮播图数组
    shopFeatures:[
      // {
      //   title: '案例集锦',
      //   iconUrl: '../../../image/shopIcon/features1.png',
      //   url:'/pages/ordinary/effectCollection/effectCollection?url=/store/geteffectlist/'
      // },
      {
        title: '团队介绍',
        iconUrl: '../../../image/shopIcon/features2.png',
        url:'/pages/decoration/teamIntroduction/teamIntroduction'
      },
      {
        title: '免费设计',
        iconUrl: '../../../image/shopIcon/features3.png',
        url:'/pages/decoration/designFree/designFree'
      },
      {
        title: '装修预算',
        iconUrl: '../../../image/shopIcon/features4.png',
        url:'/pages/decoration/decorationCalculator/decorationCalculator?type=shop'
      },
      {
        title: '材料商城',
        iconUrl: '../../../image/shopIcon/features5.png',
        url:'/pages/decoration/materialsMall/materialsMall'
      },

    ],
    userFeaturesList : [
      {
        ordinaryIcon : '../../../image/icon/ordinary5.png',
        ordinaryTitle : '我的收藏',
        ordinaryUrl : '/pages/ordinary/effectCollection/effectCollection'
      },
      {
        ordinaryIcon : '../../../image/icon/decoration11.png',
        ordinaryTitle : '我的订单',
        ordinaryUrl : '/pages/decoration/orderListManage/orderListManage'
      },
      {
        ordinaryIcon : '../../../image/icon/ordinary3.png',
        ordinaryTitle : '装修预定',
        ordinaryUrl : '/pages/ordinary/decorationSchedule/decorationSchedule'
      },
      {
        ordinaryIcon : '../../../image/icon/ordinary4.png',
        ordinaryTitle : '材料预定',
        ordinaryUrl : '/pages/ordinary/materialOrder/materialOrder'
      },
      {
        ordinaryIcon : '../../../image/icon/ordinary7.png',
        ordinaryTitle : '推广注册',
        ordinaryUrl : '/pages/ordinary/myPromotion/myPromotion'
      },
    ],//用户通用功能
    tabIndex: 0,
    allList:[],
    realList:[],
    commissionType : 0,
    userData : {},
    shopData : {},
    formDataOne:{
      page : 1,
      pagesize : 10,
    },
    load : false,
    ShopID : ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userData : app.globalData.userData,
      ShopID : options.ShopID,
    })
  },
  call(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone, //此号码仅用于测试 。
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
  changeIndex(e) {
    if(e.currentTarget.dataset.index == 1){
      wx.switchTab({
        url: '/pages/tabBar/index/index'
      })
      return
    }
    if(e.currentTarget.dataset.index == 2){
      wx.switchTab({
        url: '/pages/tabBar/news/news'
      })
      return
    }
    if(e.currentTarget.dataset.index == 3){
      app.goUrl('/pages/decoration/promoteCode/promoteCode')
      return
    }
    this.setData({
      tabIndex: e.currentTarget.dataset.index
    })
  },
  goUrl(e){
    if(e.currentTarget.dataset.url == '/pages/decoration/introductionBody/introductionBody'){//跳转简介详情
      app.globalData.introductionBody = this.data.shopData.Description
    }
    if(e.currentTarget.dataset.url == '/pages/decoration/decorationCalculator/decorationCalculator?type=shop'){
      e.currentTarget.dataset.url = e.currentTarget.dataset.url+'&ShopID='+this.data.ShopID
    }else{
      e.currentTarget.dataset.url = e.currentTarget.dataset.url+'?ShopID='+this.data.ShopID
    }
    app.goUrl(e.currentTarget.dataset.url)
  },
  changeCommissionType(e){
    this.setData({
      commissionType : e.currentTarget.dataset.commissiontype,
    })
  },
  getAllList(){
    var data = {
      shopId  : this.data.ShopID,
      keyword : '',
      page : 1,
      pagesize : 10
    }
    app.ajaxToken('/store/geteffectlist/'+this.data.ShopID,data,'get').then(res=>{
      this.setData({
        allList : res.data
      })
    })
  },
  getRealList(){
    var data = {
      shopId  : this.data.ShopID,
      keyword : '',
      page : 1,
      pagesize : 10
    }
    app.ajaxToken('/store/getcaselist/'+this.data.ShopID,data,'get').then(res=>{
      this.setData({
        realList : res.data
      })
    })
  },
  getUserInfo(){
    app.ajaxToken('/store/getshopinfo/'+this.data.ShopID,'','get').then(res=>{
      this.setData({
        shopData : res.data
      })
    })
    app.ajaxToken('/store/getshopadvs/'+this.data.ShopID,'','get').then(res=>{
      this.setData({
        imgArr : res.data
      })
    })
  },
  loadresh(){
    this.setData({
      'formData.page' : 1,
      list : [],
    })
    this.getList()
  },
  getList() {
    var that = this
    // type 1:上架 0:下架 不传则为全部
    var data = {
      page : this.data.formDataOne.page,
      pagesize : this.data.formDataOne.pagesize,
    }
    app.ajaxToken('/store/geteffectlist/'+ this.data.ShopID, data, 'get').then(res => {
      if(res.status == 0){
        if(that.data.formDataOne.page <= res.pagecount){
          that.setData({
            load : false,
            allList:this.data.allList.concat(res.data),
            'formData.page' : that.data.formDataOne.page + 1
          })
        }
      }else{
        wx.showToast({
          title: res.msg,
          icon:'none'
        })
      }
    })
  },
  goLocation(){
    var that = this
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function(res) {
       var latitude = res.latitude
       var longitude = res.longitude
       wx.openLocation({
        latitude: that.data.shopData.Latitude ? that.data.shopData.Latitude  : latitude,
        longitude:that.data.shopData.Longitude ? that.data.shopData.Longitude  : longitude ,
        name:that.data.shopData.Address,
        scale: 28
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
    this.getUserInfo()
    this.getList()
    this.getRealList()
    setTimeout(()=>{
      wx.setNavigationBarTitle({
        title: this.data.shopData.CompanyName,
      })
    },500)
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
    return {
      title: '装联客易',
      desc: this.data.userData.NickName+'的店铺',
      path: '/pages/decoration/myShop/myShop?ShopID='+this.data.ShopID // 路径，传递参数到指定页面。
     }
  }
})