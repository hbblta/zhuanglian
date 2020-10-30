// pages/decoration/employeeDetails/employeeDetails.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked:true,
    decorationArray: {
      textList: ['张三', '李四', '王二', '码字'],
      idList: [0, 1, 2, 3]
    },
    employeePay: false,
    featuresListImg: [{
        imgUrl: '../../../image/icon/employee1.png',
        name: '客户管理'
      },
      {
        imgUrl: '../../../image/icon/employee2.png',
        name: '下属管理'
      },
      {
        imgUrl: '../../../image/icon/employee3.png',
        name: '订单管理'
      },
      {
        imgUrl: '../../../image/icon/employee4.png',
        name: '店铺推广'
      },
    ],
    sfIndex: '',
    sfarray: [],
    payIndex:'',
    payarray:[],
    parentIndex:'',
    childIndex:'',
    yuanarray:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let pages = getCurrentPages();
    let current = pages[pages.length - 2];
    this.setData({
      info: current.data.nowObj
    })
    this.getsf()
    this.pay()
    this.getUser()
  },
  //是否同意服务条款
  checkboxChange(e){
    this.setData({
      checked:!this.data.checked
    })
  },
  //支付
  pays(){
    if(!this.data.checked){
      wx.showToast({
        title: '请先勾选服务条款',
        icon:'none',
        mask:true
      })
      return
    }
    var data={
      staffID:this.data.info.StaffID,
      costID:this.data.payarray[this.data.payIndex].CostID
    }
    app.ajaxToken('/shop/staffpass/'+app.globalData.userData.ShopID,data,'post').then(res=>{
      app.pay(res.data)
    })
  },
  //员工列表
  getUser(){
    var data={
      state:2,
      page:1,
      pagesize:30
    }
    app.ajaxToken('/shop/getstafflist/'+app.globalData.userData.ShopID,data,'get').then(res=>{
      var arr=[
        {}
      ]
      console.log(res)
    })
  },
  //支付方式获取
  pay(){
    app.ajaxToken('/common/getcostsettings?costType=2','','get').then(res=>{
      this.setData({
        payarray:res.data
      })
    })
  },
  //身份获取
  getsf() {
    app.ajaxToken('/common/getidentities', '', 'get').then(res => {
      this.setData({
        sfarray: res.data
      })
    })
  },
  bindPickerChange3(e) {
    this.setData({
      sfIndex: e.detail.value
    })
  },
  bindPickerChange4(e) {
    this.setData({
      payIndex: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
  },
  changeEmployeePay() {
    if(!this.data.sfIndex){
      wx.showToast({
        title: '请先选择身份',
        icon:'none',
        mask:true
      })
      return
    }
    if(!this.data.payIndex){
      wx.showToast({
        title: '请先选择付款方式',
        icon:'none',
        mask:true
      })
      return
    }
    this.setData({
      employeePay: true
    })
  },
  //驳回
  oppose() {
    console.log(this.data.info)
    app.ajaxToken('/shop/backstaff/' + app.globalData.userData.ShopID + '/' + this.data.info.StaffID, '', 'post').then(res => {
      if (res.status == 0) {
        wx.showToast({
          title: res.msg,
        })
        setTimeout(() => {
          wx.navigateBack()
        }, 1500);
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