// pages/decoration/clientManage/clientManage.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabType: ['客户类别', '管理人员', '客户来源', '时间', '星级'],
    info: {},
    date: '',
    date2: '',
    typeIndex: '',
    typearr: [{
        id: 1,
        name: '潜在'
      },
      {
        id: 2,
        name: '精准'
      },
      {
        id: 3,
        name: '报单'
      },
      {
        id: 4,
        name: '成交'
      },
    ],
    sourceIndex:'',
    sourcearr:[
      {id: 0,name: '查看效果'},
      {id: 1,name: '免费设计'},
      {id: 2,name: '预算报价'},
      {id: 3,name: '清单报价'},
      {id: 4,name: '报备客户'},
      {id: 5,name: '其他'},
    ],
    gradeIndex:'',
    gradearr:[

    ]
  },
  bindPickerChange3(e) {
    this.setData({
      sourceIndex: e.detail.value
    })
  },
  bindPickerChange2(e) {
    this.setData({
      typeIndex: e.detail.value
    })
  },
  bindPickerChange6(e) {
    this.setData({
      gradeIndex: e.detail.value
    })
  },
  bindPickerChange4(e) {
    this.setData({
      date: e.detail.value
    })
    if (this.data.date && this.data.date2) {}
  },
  bindPickerChange5(e) {
    this.setData({
      date2: e.detail.value
    })
    if (this.data.date && this.data.date2) {}
  },
  goUrl(e) {
    app.goUrl(e.currentTarget.dataset.url)
  },
  //delete 
  delete(e) {
    console.log('点击了删除')
  },
  //跟进

  follow(e) {
    console.log('点击了跟进')
    app.goUrl('/pages/decoration/clientFollowUp/clientFollowUp')
  },
  //报单
  declaration(e) {
    app.goUrl('/pages/decoration/declaration/declaration')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '客户详情'
    })
    this.getInfo()
  },
  //获取统计
  getInfo() {
    app.ajaxToken('/shop/getcustomerstat/' + app.globalData.userData.ShopID, '', 'get').then(res => {
      this.setData({
        info: res.data
      })
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