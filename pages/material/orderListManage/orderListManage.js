// pages/decoration/clientManage/clientManage.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    info: {},
    date: '',
    date2: '',
    sourceIndex:'',
    sourcearr:[
      {id: 0,name: '引流客户'},
      {id: 1,name: '分享客户'},
    ],
    gradeIndex:'',
    gradearr:[

    ],
    stateIndex:'',
    statearr:[],
    keyword:'',
    page:1,
    pagecount:0,
    flag:true,
    //当前点击的对象信息
    nowobj:{}
  },
  getvalue(e){
    this.setData({
      keyword:e.detail.value,
      page:1,
      flag:true,
      list:[]
    })
    this.getList()
  },
  bindPickerChange3(e) {
    this.setData({
      sourceIndex: e.detail.value,
      page:1,
      flag:true,
      list:[]
    })
    this.getList()
  },
  bindPickerChange2(e) {
    this.setData({
      typeIndex: e.detail.value,
      page:1,
      flag:true,
      list:[]
    })
    this.getList()
  },
  bindPickerChange6(e) {
    this.setData({
      gradeIndex: e.detail.value,
      page:1,
      flag:true,
      list:[]
    })
    this.getList()
  },
  bindPickerChange4(e) {
    this.setData({
      date: e.detail.value
    })
    if (this.data.date && this.data.date2) {
      this.setData({
        page:1,
        flag:true,
        list:[]
      })
      this.getList()
    }
  },
  bindPickerChange5(e) {
    this.setData({
      date2: e.detail.value
    })
    if (this.data.date && this.data.date2) {
      this.setData({
        page:1,
        flag:true,
        list:[]
      })
      this.getList()
    }
  },
  bindPickerChange7(e){
    this.setData({
      stateIndex: e.detail.value
    })
    this.setData({
      page:1,
      flag:true,
      list:[]
    })
    this.getList()
  },
  delete(e){
    var id = e.currentTarget.dataset.id
    app.ajaxToken('/materialshop/delorder/'+app.globalData.userData.MaterialShopID+'/'+'id','','delete').then(res=>{
      wx.showToast({
        title: res.msg,
        icon:none
      })
      setTimeout(()=>{
         this.setData({
           page:1,
           list:[],
           flag:true,
         })
         this.getList()
      },1500)
    })
  },
  goUrl(e) {
    app.goUrl(e.currentTarget.dataset.url)
  },
  //报单
  // declaration(e) {
  //   app.goUrl('/pages/decoration/declaration/declaration')
  // },
  scroll(e){
     if(this.data.page<this.data.pagecount){
       if(this.data.flag){
         this.setData({
           flag:false,
           page:this.data.page+1
         })
         this.getList()
       }
     }else{
       return
     }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '订单管理'
    })
    this.getList()
    this.getInfo()
    this.getgrade()
    this.getstate()
  },
  //获取订单状态
  getstate(){
    app.ajaxToken('/common/getdecorationorderstates','','get').then(res=>{
      this.setData({
        statearr:res.data
      })
    })
  },
  //获取星级
  getgrade(){
    app.ajaxToken('/common/getintergralgrade/1','','get').then(res=>{
      this.setData({
        gradearr:res.data
      })
    })
  },
  //获取统计
  getInfo() {
    app.ajaxToken('/materialshop/getorderstat/' + app.globalData.userData.MaterialShopID, '', 'get').then(res => {
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
  //获取客户列表
  getList(){
    var data={
      page:this.data.page,
      keyword:this.data.keyword,
      manager:app.globalData.userData.UserID
    }
    if(this.data.gradeIndex){
      data.grade = this.data.gradearr[this.data.gradeIndex].Nubmer
    }
    if(this.data.sourceIndex){
      data.source = this.data.sourcearr[this.data.sourceIndex].id
    }
    if(this.data.stateIndex){
      data.state = this.data.statearr[this.data.stateIndex].value
    }
    app.ajaxToken('/materialshop/getorderlist/'+app.globalData.userData.MaterialShopID,data,'get').then(res=>{
      this.setData({
        list:this.data.list.concat(res.data),
        flag:true,
        pagecount:res.pagecount
      })
    })
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

