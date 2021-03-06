  // pages/material/myShop/myShop.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id : '',
    showType : 'my',
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
      {
        title: '会员',
        iconUrl: '../../../image/shopIcon/55.png',
        changeIcon: '../../../image/shopIcon/5.png',
      },
    ], //tabbar数组
    imgArr: [],//轮播图数组
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
    commissionType : 0,
    userData : {},
    shopData : {},
    formDataOne:{
      page : 1,
      pagesize : 10,
      order : null
    },
    load : false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if(options.id){
      this.setData({
        id : options.id,
        showType : 'others'
      })
    }else{
      this.setData({
        id : app.globalData.userData.MaterialShopID
      })
      
    }
    this.setData({
      userData : app.globalData.userData
    })
    this.getUserInfo()
    this.getList()
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
    app.goUrl(e.currentTarget.dataset.url)
  },
  changeCommissionType(e){
    this.setData({
      commissionType : e.currentTarget.dataset.commissiontype,
    })
  },
  getUserInfo(){//获取店铺信息，轮播图
    app.ajaxToken('/materialstore/getshopinfo/'+this.data.id,'','get').then(res=>{
      this.setData({
        shopData : res.data
      })
    })
    app.ajaxToken('/materialstore/getshopadvs/'+this.data.id,'','get').then(res=>{
      this.setData({
        imgArr : res.data
      })
    })
  },
  priceSort(){
    var order = null
    if(this.data.formDataOne.order == null){
      order = 'asc'
    }
    if(this.data.formDataOne.order == 'asc'){
      order = 'desc'
    }
    if(this.data.formDataOne.order == 'desc'){
      order = null
    }
    this.setData({
      'formDataOne.page' : 1,
      'formDataOne.order' : order,
      allList : [],
    })
    this.getList()
  },
  resetList(){
    this.setData({
      'formDataOne.page' : 1,
      'formDataOne.order' : null,
      allList : []
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
    if(this.data.formDataOne.order) data.order = this.data.formDataOne.order
    app.ajaxToken('/materialstore/getmateriallist/'+ this.data.id, data, 'get').then(res => {
      if(res.status == 0){
        if(that.data.formDataOne.page <= res.pagecount){
          that.setData({
            load : false,
            allList: that.data.allList.concat(res.data),
            'formDataOne.page' : that.data.formDataOne.page + 1
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