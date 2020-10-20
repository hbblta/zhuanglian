// pages/decoration/myShop/myShop.js
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
    tabIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  changeIndex(e) {
    this.setData({
      tabIndex: e.currentTarget.dataset.index
    })
  },
  goUrl(e){
    app.goUrl(e.currentTarget.dataset.url)
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