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
      {
        title: '会员',
        iconUrl: '../../../image/shopIcon/55.png',
        changeIcon: '../../../image/shopIcon/5.png',
      },
    ], //tabbar数组
    imgArr: [{
        imageUrl: 'https://dss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/logo_white-d0c9fe2af5.png'
      },
      {
        imageUrl: 'https://dss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/logo_white-d0c9fe2af5.png'
      }
    ],//轮播图数组
    shopFeatures:[
      {
        title: '案例集经',
        iconUrl: '../../../image/shopIcon/features1.png',
        url:''
      },
      {
        title: '团队介绍',
        iconUrl: '../../../image/shopIcon/features2.png',
        url:''
      },
      {
        title: '免费设计',
        iconUrl: '../../../image/shopIcon/features3.png',
        url:''
      },
      {
        title: '装修预算',
        iconUrl: '../../../image/shopIcon/features4.png',
        url:''
      },
      {
        title: '材料商城',
        iconUrl: '../../../image/shopIcon/features5.png',
        url:''
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
    list:[
      {
       imgUrl : '',
       decorationName : '金华材料商',
       decorationAddress : '金华市',
       decorationPhone:'1008611'
      },
      {
       imgUrl : '',
       decorationName : '北京材料商',
       decorationAddress : '北京市',
       decorationPhone:'121300861154154'
      },
      {
       imgUrl : '',
       decorationName : '新疆材料商',
       decorationAddress : '新疆市',
       decorationPhone:'1541857415114'
      },
    ],
    commissionType : 0,
    userData : {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userData : app.globalData.userData
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
    app.goUrl(e.currentTarget.dataset.url)
  },
  changeCommissionType(e){
    this.setData({
      commissionType : e.currentTarget.dataset.commissiontype,
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