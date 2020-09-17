// pages/tabBar/my/my.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userFeaturesList : [
      {
        ordinaryIcon : '../../../image/icon/ordinary1.png',
        ordinaryTitle : '装修公司',
        ordinaryUrl : '/pages/ordinary/decorationRecording/decorationRecording'
      },
      {
        ordinaryIcon : '../../../image/icon/ordinary2.png',
        ordinaryTitle : '材料商',
        ordinaryUrl : '/pages/ordinary/materialRecording/materialRecording'
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
        ordinaryIcon : '../../../image/icon/ordinary5.png',
        ordinaryTitle : '效果收藏',
        ordinaryUrl : '/pages/ordinary/effectCollection/effectCollection'
      },
      {
        ordinaryIcon : '../../../image/icon/ordinary6.png',
        ordinaryTitle : '材料收藏',
        ordinaryUrl : '/pages/ordinary/materialCollection/materialCollection'
      },
      {
        ordinaryIcon : '../../../image/icon/ordinary7.png',
        ordinaryTitle : '我的推广',
        ordinaryUrl : '/pages/ordinary/myPromotion/myPromotion'
      },
      {
        ordinaryIcon : '../../../image/icon/ordinary8.png',
        ordinaryTitle : '施工现场',
        ordinaryUrl : '/pages/ordinary/constructionSite/constructionSite'
      },
      {
        ordinaryIcon : '../../../image/icon/ordinary9.png',
        ordinaryTitle : '我要注册',
        ordinaryUrl : '/pages/ordinary/login/login'
      }
    ],
    userData : {},
    decorationFeaturesList:[
      {
        ordinaryIcon : '../../../image/icon/decoration1.png',
        ordinaryTitle : '我的店铺',
        ordinaryUrl : '/pages/ordinary/login/login'
      },
      {
        ordinaryIcon : '../../../image/icon/decoration2.png',
        ordinaryTitle : '我的推广码',
        ordinaryUrl : '/pages/decoration/promoteCode/promoteCode'
      },
      {
        ordinaryIcon : '../../../image/icon/decoration3.png',
        ordinaryTitle : '文章引流',
        ordinaryUrl : '/pages/decoration/articlePromote/articlePromote'
      },
      {
        ordinaryIcon : '../../../image/icon/decoration4.png',
        ordinaryTitle : '装修计算器',
        ordinaryUrl : '/pages/decoration/decorationCalculator/decorationCalculator'
      },
      {
        ordinaryIcon : '../../../image/icon/decoration5.png',
        ordinaryTitle : '效果图管理',
        ordinaryUrl : '/pages/decoration/effectPicture/effectPicture'
      },
      {
        ordinaryIcon : '../../../image/icon/decoration6.png',
        ordinaryTitle : '设计团队管理',
        ordinaryUrl : '/pages/decoration/teamManagement/teamManagement'
      },
      {
        ordinaryIcon : '../../../image/icon/decoration7.png',
        ordinaryTitle : '分销团队管理',
        ordinaryUrl : '/pages/decoration/distribution/distribution'
      },
      {
        ordinaryIcon : '../../../image/icon/decoration8.png',
        ordinaryTitle : '佣金管理',
        ordinaryUrl : '/pages/decoration/commission/commission'
      },
      {
        ordinaryIcon : '../../../image/icon/decoration9.png',
        ordinaryTitle : '员工管理',
        ordinaryUrl : '/pages/decoration/employee/employee'
      },
      {
        ordinaryIcon : '../../../image/icon/decoration10.png',
        ordinaryTitle : '客户管理',
        ordinaryUrl : '/pages/decoration/clientManage/clientManage'
      },
      {
        ordinaryIcon : '../../../image/icon/decoration11.png',
        ordinaryTitle : '订单管理',
        ordinaryUrl : '/pages/decoration/orderListManage/orderListManage'
      },
      {
        ordinaryIcon : '../../../image/icon/decoration12.png',
        ordinaryTitle : '合作管理',
        ordinaryUrl : '/pages/decoration/cooperative/cooperative'
      },
      {
        ordinaryIcon : '../../../image/icon/decoration13.png',
        ordinaryTitle : '提成设置',
        ordinaryUrl : '/pages/decoration/percentageSet/percentageSet'
      },
      {
        ordinaryIcon : '../../../image/icon/decoration14.png',
        ordinaryTitle : '排行榜单',
        ordinaryUrl : '/pages/decoration/rankingList/rankingList'
      },
      {
        ordinaryIcon : '../../../image/icon/decoration15.png',
        ordinaryTitle : '施工管理',
        ordinaryUrl : '/pages/decoration/buildManage/buildManage'
      },
      {
        ordinaryIcon : '../../../image/icon/decoration16.png',
        ordinaryTitle : '辅材管理',
        ordinaryUrl : '/pages/decoration/secondaryManage/secondaryManage'
      }
    ]
  },

  goUrl(e){
    app.goUrl(e.currentTarget.dataset.url)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.$watch('userData', (val, old) => {
      console.log('监听全局用户数据触发')
      this.setData({
        userData : app.globalData.userData
      })
    })
    this.setData({
      userData : app.globalData.userData
    })
    if(this.data.userData.userType == 2){
      this.data.userFeaturesList.splice(8,1)
      this.setData({
        userFeaturesList : this.data.userFeaturesList
      })
    }
  },

  onTabItemTap(item) {
    wx.setNavigationBarTitle({
      title: '我的'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#0081FF',
      // animation: {
      //   duration: 200,
      //   timingFunc: 'easeIn'
      // }
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