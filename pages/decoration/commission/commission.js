// pages/decoration/commission/commission.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    textListIndex:0,
    customerType:0,
    textList:[],
    customerTypeList : [
      {
        name : '总佣金',
        price:'',
        id : 0
      },
      {
        name : '已提现',
        price:'',
        id : 1
      },
      {
        name : '未提现',
        price:'',
        id : 2,
        addStatus:true
      },
      {
        name : '待付提现',
        price:'',
        id : 2
      },
      {
        name : '待确认提现',
        price:'',
        id : 2
      },
    ],
    commissionTypeList:[
      {
        name : '总佣金',
        price:'',
        id : 0
      },
      {
        name : '已付佣金',
        price:'',
        id : 1
      },
      {
        name : '未付佣金',
        price:'',
        id : 2,
        addStatus:true
      },
    ],
    windowHeight : 0,
    commissionType : 0,
    page:1,
    keyword:'',
    //左边 tab 选项 默认总佣金1
    type:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({  
      success: (res) => {
        this.setData({
          windowHeight: (res.windowHeight * (750 / res.windowWidth))
        })
      },
    })
    wx.setNavigationBarTitle({
      title: '佣金管理',
    })
    this.setData({
      textList : this.data.customerTypeList
    })
    this.getShop()
    this.getfxList()
  },
  //获取店铺分销提成
  getShop(){
    app.ajaxToken('/shop/getdistributorcommissionstat/'+app.globalData.userData.ShopID,'','get').then(res=>{
      if(res.status == 0){
        var data = this.data.customerTypeList
        var obj = res.data
        //总佣金
        data[0].price = obj.TotalCommission
        //已提现
        data[1].price = obj.WithdrawaledCommission
        //未提现
        data[2].price = obj.BalanceCommission
        //待付提现
        data[3].price = obj.PaymentCommission
        //待确认提现
        data[4].price = obj.ConfirmCommission
        this.setData({
          textList:data
        })
      }else{
        wx.showToast({
          title: res.msg,
          icon:'none'
        })
      }
    })
  },
  //获取店铺员工提成
  getYuan(){
    app.ajaxToken('/shop/getstaffcommissionstat/'+app.globalData.userData.ShopID,'','get').then(res=>{
      if(res.status == 0){
        var data = this.data.commissionTypeList
        var obj = res.data
        //总佣金
        data[0].price = obj.TotalCommission
        //已付佣金
        data[1].price = obj.PaymentedCommission
        //未付佣金
        data[2].price = obj.BalanceCommission
        this.setData({
          commissionTypeList:data,
          textList:this.data.commissionTypeList
        })
      }else{
        wx.showToast({
          title: res.msg,
          icon:'none'
        })
      }
    })
  },
  changeIndex(e){
    this.setData({
      textListIndex : e.currentTarget.dataset.index
    })
    this.getList()
  },
  changeCommissionType(e){//更改佣金支付角色
    if(e.currentTarget.dataset.commissiontype == 0){
      this.setData({
        textListIndex : 0,
        commissionType : e.currentTarget.dataset.commissiontype,
        keyword:'',
        type:1
      })
      this.getShop()
      this.getfxList()
    }else{
      this.setData({
        textListIndex :  0,
        commissionType : e.currentTarget.dataset.commissiontype,
        keyword:'',
        type:1
      })
      this.getYuan()
      this.getygList()
    }

  },
  //获取员工提成的 人员列表
  getygList(){
    var data={
      type:this.data.type,
      keyword:this.data.keyword,
      page:this.data.page
    }
    app.ajaxToken('/shop/getstaffcommissionlist/'+app.globalData.userData.ShopID,data,'get').then(res=>{
      console.log(res)
    })
  },
  //获取分销提成的 人员列表
  getfxList(){
    var data={
      type:this.data.type,
      keyword:this.data.keyword,
      page:this.data.page
    }
    app.ajaxToken('/shop/getdistributorcommissionlist/'+app.globalData.userData.ShopID,data,'get').then(res=>{
      console.log(res)
    })
  },
  //input事件
  getvalue(e){
    this.setData({
        keyword:e.detail.value
    })
    if(this.data.commissionType == 1){
      this.getygList()
    }else{
      this.getfxList()
    }
  },
  getList(){
    var type = Number(this.data.textListIndex)+1
    this.setData({
      page:1,
      keyword:'',
      type
    })
    //员工提成获取列表
    if(this.data.commissionType==1){
      this.getygList()
    }else{
      this.getfxList()
    }
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