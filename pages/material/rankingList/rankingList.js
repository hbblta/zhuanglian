// pages/decoration/rankingList/rankingList.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      tabText:['员工排行榜','装企排行榜'],
      //当前选中的tab
      tabIndex:0,
      //员工排行榜list
      personnelList:[
      
      ],
      //装企排行榜list
      retailKingList:[
       
      ],
      //员工排行榜 
      roleIndex:'0',
      rolearr:[
        {id:1,name:'开发员'},
        {id:2,name:'跟单员'},
      ],
      typeIndex:'',
      typearr:[
        {id:1,name:'自营'},
        {id:2,name:'下属'},
      ],
      orderIndex:'0',
      orderarr:[],
      orderarr1:[
        {id:1,name:'跟单量'},
        {id:2,name:'到店量'},
        {id:3,name:'成交量'},
        {id:4,name:'成交额'},
      ],
      orderarr2:[
        {id:1,name:'成交量'},
        {id:2,name:'成交额'},
      ],
     
      date:'',
      date2:'',
      userpage:1,
      //分销排行榜
      fxpage:1,
      date3:'',
      date4:'',
      zqIndex:'',
      zqarr:[
        {id:1,name:'自营'},
        {id:2,name:'下属'},
      ],
      fxorderIndex:0,
      fxorderarr:[
        {id:1,name:'引流量'},
        {id:2,name:'分享量'},
        {id:3,name:'成交量'},
        {id:4,name:'成交额'}
      ]
  },
  bindPickerChange(e){
    this.setData({
      roleIndex:e.detail.value,
      orderIndex:''
    })
    var arr = []
    if(e.detail.value == 0 ){
      arr = this.data.orderarr1 
      this.setData({
        orderIndex : '0'
      })
    }else if(e.detail.value == 1){
      arr = this.data.orderarr2
    }else{
      
    }
    this.setData({
      orderarr:arr
    })
    this.getUser()
  },
  bindPickerChange2(e){
    this.setData({
      typeIndex:e.detail.value
    })
    this.getUser()
  },
  bindPickerChange3(e){
    this.setData({
      orderIndex:e.detail.value
    })
    this.getUser()
  },
  bindPickerChange4(e){
    this.setData({
      date:e.detail.value
    })
    if(this.data.date&&this.data.date2){
      this.getUser()
    }
  },
  bindPickerChange5(e){
    this.setData({
      date2:e.detail.value
    })
    if(this.data.date&&this.data.date2){
      this.getUser()
    }
  },
  bindPickerChange6(e){
    this.setData({
      fxorderIndex:e.detail.value
    })
    this.getFx()
  },
  bindPickerChange7(e){
    this.setData({
      date3:e.detail.value
    })
    if(this.data.date3&&this.data.date4){
      this.getFx()
    }
  },
  bindPickerChange8(e){
    this.setData({
      date4:e.detail.value
    })
    if(this.data.date3&&this.data.date4){
      this.getFx()
    }
  },
  bindPickerChange9(e){
    this.setData({
      zqIndex:e.detail.value
    })
    this.getFx()
  },
  //tab切换
  tabChange(e){
    this.setData({
      tabIndex:e.currentTarget.dataset.index
    })
    if(this.data.tabIndex){
      this.setData({
        fxpage:1
      })
      this.getFx()
    }else{
      this.setData({
        userpage:1
      })
      this.getUser()
    }
  },
  //员工排行榜list
  getUser(){
    console.log(app.globalData.userData)
    var data={
      page:this.data.userpage,
      role:this.data.rolearr[this.data.roleIndex].id,
      pagesize:100
    }
    if(this.data.typeIndex){
      data.type = this.data.typearr[this.data.typeIndex].id
    }
    if(this.data.orderIndex){
      data.order = this.data.orderarr[this.data.orderIndex].id
    }
    if(this.data.date&&this.data.date2){
      data.begindate = this.data.date
      data.enddate = this.data.date2
    }
    app.ajaxToken('/materialstaff/getstaffsortlist/'+app.globalData.userData.StaffID,data,'get').then(res=>{
      this.setData({
        personnelList:res.data
      })
    })
  },
  //分销排行榜
  getFx(){
    var data={
      page:this.data.fxpage,
      order:this.data.fxorderarr[this.data.fxorderIndex].id,
      pagesize:100
    }
    if(this.data.date3&&this.data.date4){
      data.begindate = this.data.date3
      data.enddate = this.data.date4
    }
    if(this.data.zqIndex){
      data.type = this.data.zqarr[this.data.zqIndex].id
    }
    app.ajaxToken('/materialstaff/getshopsortlist/'+app.globalData.userData.StaffID,data,'get').then(res=>{
      this.setData({
        retailKingList:res.data
      })
    })
   
  },

  //分销排行榜排序条件点击
  retailSort(e){
    var index = e.currentTarget.dataset.index
    console.log('当前点击分销排行榜'+this.data.retailList[index])
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '排行榜单',
    })
    //不同角色不同数据
    this.setData({
      orderarr:this.data.orderarr1
    })
    this.getUser()
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