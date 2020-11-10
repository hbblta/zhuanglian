// pages/decoration/clientManage/clientManage.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    load : false,
    list:[],
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
        name: '订单'
      },
      {
        id: 4,
        name: '成交'
      },
    ],
    sourceIndex:'',
    sourcearr:[
      {id: 0,name: '引流客户'},
      {id: 1,name: '分享客户'},
    ],
    keyword:'',
    page:1,
    pagecount:0,
    flag:true,
    load:true,
    //当前点击的对象信息
    nowobj:{}
  },
  loadresh(e){
    this.setData({
      list:[],
      page:1,
      pagecount:0,
      flag:true
    })
    setTimeout(() => {
        this.setData({
          load:false
        })
    },1500);
    this.getList()
  },
  getvalue(e){
    this.setData({
      keyword:e.detail.value,
      page:1,
      flag:false,
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
  goUrl(e) {
    app.goUrl(e.currentTarget.dataset.url)
  },
  //跟进
  follow(e) {
    var id = e.currentTarget.dataset.id
    var index = e.currentTarget.dataset.index
    var idx = e.currentTarget.dataset.idx
    this.setData({
      nowobj:this.data.list[index]
    })
    if(idx){
       app.goUrl('/pages/material/clientFollowUp/clientFollowUp?id='+id+'&idx='+3)
    }else{
      app.goUrl('/pages/material/clientFollowUp/clientFollowUp?id='+id)
    }
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
      title: '客户管理'
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
    app.ajaxToken('/materialshop/getcustomerstat/' + app.globalData.userData.MaterialShopID, '', 'get').then(res => {
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
    if(this.data.sourceIndex){
      data.source = this.data.sourcearr[this.data.sourceIndex].id
    }
    if(this.data.typeIndex){
      data.type = this.data.typearr[this.data.typeIndex].id
    }
    app.ajaxToken('/materialshop/getcustomerlist/'+app.globalData.userData.MaterialShopID,data,'get').then(res=>{
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
    this.setData({
      list:[],
      page:1,
      flag:true
    })
    this.getList()
    this.getInfo()
    this.getgrade()
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