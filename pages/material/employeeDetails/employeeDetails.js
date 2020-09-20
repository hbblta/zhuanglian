// pages/decoration/employeeDetails/employeeDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    decorationArray:{
      textList: ['张三','李四','王二','码字'],
      idList: [0,1,2,3]
     },
     employeePay: false,
     featuresListImg:[
      {
        imgUrl:'../../../image/icon/employee1.png',
        name:'客户管理'
      },
      {
        imgUrl:'../../../image/icon/employee2.png',
        name:'下属管理'
      },
      {
        imgUrl:'../../../image/icon/employee3.png',
        name:'订单管理'
      },
      {
        imgUrl:'../../../image/icon/employee4.png',
        name:'店铺推广'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '员工详情',
    })
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
  },
  changeEmployeePay(){
    this.setData({
      employeePay : true
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