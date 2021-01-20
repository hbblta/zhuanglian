// pages/decoration/cooperativeCost/cooperativeCost.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    featuresListImg:[
      {
        imgUrl:'../../../image/icon/employee1.png',
        name:'客户管理'
      },
      {
        imgUrl:'../../../image/icon/employee2.png',
        name:'客户管理'
      },
      {
        imgUrl:'../../../image/icon/employee3.png',
        name:'客户管理'
      },
      {
        imgUrl:'../../../image/icon/employee4.png',
        name:'客户管理'
      },
    ],
    featuresProtocol : true,
    priceList : [],
    id : ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  checkboxChange(e){
    if(e.detail.value[0]){
      this.setData({
        featuresProtocol : true
      })
    }else{
      this.setData({
        featuresProtocol : false
      })
    }
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '合作开通服务费',
    })
    this.setData({
      id : options.id
    })
    app.ajaxToken('/common/getcostsettings?costType=4','','get').then(res=>{
      this.setData({
        priceList : res.data
      })
    })
  },
  sumit(){
    var  data = {
      AuditID : this.data.id,
      CostID : this.data.priceList[0].CostID
    }
    app.ajaxToken('/shop/cooperationpass/'+app.globalData.userData.ShopID,data,'post').then(res=>{
      app.pay(res.data)
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