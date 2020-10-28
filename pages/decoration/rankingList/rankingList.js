// pages/decoration/rankingList/rankingList.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      tabText:['员工排行榜','分销排行榜'],
      //当前选中的tab
      tabIndex:0,
      //员工排行榜筛选条件
      kindList:['排行类别','排行指标','排行时间'],
      //分销排行榜筛选条件
      retailList:['排行指标','排行时间'],
      //员工排行榜list
      personnelList:[
        {url:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=910527016,2220695787&fm=26&gp=0.jpg',name:'胡彬彬',phone:'12345678910',tema:'20人',entryTime:'2020/05/30'},
        {url:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3085552352,556493802&fm=26&gp=0.jpg',name:'胡彬彬',phone:'12345678910',tema:'20人',entryTime:'2020/05/30'},
        {url:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3943584555,2366501618&fm=15&gp=0.jpg',name:'胡彬彬',phone:'12345678910',tema:'20人',entryTime:'2020/05/30'},
        {url:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1877257905,591130638&fm=15&gp=0.jpg',name:'胡彬彬',phone:'12345678910',tema:'20人',entryTime:'2020/05/30'},
        {url:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3842853828,78964374&fm=26&gp=0.jpg',name:'胡彬彬',phone:'12345678910',tema:'20人',entryTime:'2020/05/30'},
        {url:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=978984144,3008825592&fm=26&gp=0.jpg',name:'胡彬彬',phone:'12345678910',tema:'20人',entryTime:'2020/05/30'},
        {url:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1719075638,1065027568&fm=26&gp=0.jpg',name:'胡彬彬',phone:'12345678910',tema:'20人',entryTime:'2020/05/30'},
        {url:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1829272418,1951610969&fm=15&gp=0.jpg',name:'胡彬彬',phone:'12345678910',tema:'20人',entryTime:'2020/05/30'}
      ],
      //分销排行榜list
      retailKingList:[
        {url:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=910527016,2220695787&fm=26&gp=0.jpg',name:'胡彬彬',phone:'12345678910',tema:'20人',entryTime:'2020/05/30',xing:5},
        {url:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3085552352,556493802&fm=26&gp=0.jpg',name:'胡彬彬',phone:'12345678910',tema:'20人',entryTime:'2020/05/30',xing:4},
        {url:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3943584555,2366501618&fm=15&gp=0.jpg',name:'胡彬彬',phone:'12345678910',tema:'20人',entryTime:'2020/05/30',xing:4},
        {url:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1877257905,591130638&fm=15&gp=0.jpg',name:'胡彬彬',phone:'12345678910',tema:'20人',entryTime:'2020/05/30',xing:3},
        {url:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3842853828,78964374&fm=26&gp=0.jpg',name:'胡彬彬',phone:'12345678910',tema:'20人',entryTime:'2020/05/30',xing:3},
        {url:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=978984144,3008825592&fm=26&gp=0.jpg',name:'胡彬彬',phone:'12345678910',tema:'20人',entryTime:'2020/05/30',xing:2},
        {url:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1719075638,1065027568&fm=26&gp=0.jpg',name:'胡彬彬',phone:'12345678910',tema:'20人',entryTime:'2020/05/30',xing:2},
        {url:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1829272418,1951610969&fm=15&gp=0.jpg',name:'胡彬彬',phone:'12345678910',tema:'20人',entryTime:'2020/05/30',xing:1}
      ],
      //员工排行榜 
      roleIndex:'0',
      rolearr:[
        {id:1,name:'开发员'},
        {id:2,name:'跟单员'},
        {id:3,name:'设计师'},
      ],
      typeIndex:'',
      typearr:[
        {id:1,name:'自营'},
        {id:2,name:'下属'},
        {id:3,name:'分销团队'},
      ],
      orderIndex:'',
      orderarr:[],
      orderarr1:[
        {id:1,name:'客户量'},
        {id:2,name:'设计量'},
        {id:3,name:'成交量'},
        {id:4,name:'成交额'},
      ],
      orderarr2:[
        {id:1,name:'跟单量'},
        {id:2,name:'设计量'},
        {id:3,name:'成交量'},
        {id:4,name:'成交额'},
      ],
      orderarr3:[
        {id:1,name:'设计量'},
        {id:2,name:'成交量'},
        {id:3,name:'成交额'},
      ],
      date:'',
      date2:'',
      userpage:1
  },
  bindPickerChange(e){
    this.setData({
      roleIndex:e.detail.value,
      orderIndex:''
    })
    var arr = []
    if(e.detail.value == 0 ){
      arr = this.data.orderarr1
    }else if(e.detail.value == 1){
      arr = this.data.orderarr2
    }else{
      arr = this.data.orderarr3
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
  //tab切换
  tabChange(e){
    this.setData({
      tabIndex:e.currentTarget.dataset.index
    })
  },
  //员工排行榜list
  getUser(){
    var data={
      page:this.data.userpage,
      role:this.data.roleIndex?this.data.rolearr[this.data.roleIndex].id:'',
      // type:this.data.typeIndex?this.data.typearr[this.data.typeIndex].id:'',
      // order:this.data.orderIndex?this.data.orderarr[this.data.orderIndex].id:''
    }
    if(this.data.typeIndex){
      data.type = this.data.typearr[this.data.typeIndex].id
    }
    if(this.data.orderIndex){
      data.type = this.data.orderarr[this.data.orderIndex].id
    }
    if(this.data.date&&this.data.date2){
      data.begindate = this.data.date
      data.enddate = this.data.date2
    }
    console.log(data)
    app.ajaxToken('/shop/getstaffsortlist/'+app.globalData.userData.ShopID,data,'get').then(res=>{
      console.log(res)
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