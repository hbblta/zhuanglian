// pages/decoration/cooperative/cooperative.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    textListIndex:0,
    commissiontype:0,
    textList:[
      {
        name : '合作材料',
        id: 1
      },
      {
        name : '待审合作',
        id: 1
      },
      {
        name : '发起合作',
        id: 2
      },
    ],
    area:'',
    areaid:'',
    keyword:'',
    page:1,
    pagecount:0,
    list:[]
  },
  getvalue(e){
    this.setData({
      keyword:e.detail.value,
      flag:true,
      page:1,
      list:[]
    })
    this.changeF()
  },
  scroll(e){
    if(this.data.pagecount>this.data.page){
      if(this.data.flag){
        this.setData({
          flag:false,
          page:this.data.page+1
        })
        this.changeF()
      }
    }else{
      return
    }
  },
  //当前执行哪种获取数据方法
  changeF(){
      if(this.data.textListIndex == 0){
        this.getcl()
      }
      if(this.data.textListIndex == 1){
        this.getds()
      }
      if(this.data.textListIndex == 2){
        this.getfq()
      }
  },
  changearea(e){
    this.setData({
      area:e.detail.name,
      areaid:e.detail.id,
      page:1,
      pagecount:0,
      flag:true,
      list:[]
    })
    this.changeF()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '合作管理',
    })
    //获取合作材料
    this.getcl()
  },
  changeIndex(e){
    if(e.currentTarget.dataset.index == this.data.textListIndex)return
    this.setData({
      textListIndex : e.currentTarget.dataset.index,
      commissiontype:0,
      list:[],
      page:1,
      flag:true
    })
    this.changeF()
  },
  //获取合作材料
  getcl(){
    var that = this
    var data={
      page:this.data.page,
      keyword:this.data.keyword
    }
    data.type = this.data.commissiontype - 0?2:1
    if(this.data.areaid){
      data.area = this.data.areaid
    }
    app.ajaxToken('/shop/getcooperationlist/'+app.globalData.userData.ShopID,data,'get').then(res=>{
      res.data.forEach((item,index) => {
        res.data[index].EndDate = app.changeDateFormat(item.EndDate)
      });
      this.setData({
        list:this.data.list.concat(res.data),
        flag:true,
        pagecount:res.pagecount
      })
    })
  },
  //获取待审合作列表
  getds(){
    var data = {
      keyword:this.data.keyword,
      page:this.data.page,
      type:this.data.commissiontype - 0?2:1
    }
    if(this.data.areaid){
      data.area = this.data.areaid
    }
    app.ajaxToken('/shop/getcooperatonauditlist/'+app.globalData.userData.ShopID,data,'get').then(res=>{
      this.setData({
        list:this.data.list.concat(res.data),
        flag:true,
        pagecount:res.pagecount
      })
    })
  },
  //获取发起合作列表
  getfq(){
    var data = {
      keyword:this.data.keyword,
      page:this.data.page,
    }
    if(this.data.areaid){
      data.area = this.data.areaid
    }
    var url = this.data.commissiontype == 0?'/shop/launchcooperationlist/':'/shop/sponsorcooperationlist/'
    if(this.data.commissiontype == 0){
    }else{
      data.type = this.data.commissiontype
    }
    app.ajaxToken(url+app.globalData.userData.ShopID,data,'get').then(res=>{
      this.setData({
        list:this.data.list.concat(res.data),
        flag:true,
        pagecount:res.pagecount
      })
    })
  },
  changeCommissionType(e){
    this.setData({
      commissiontype : e.currentTarget.dataset.commissiontype
    })
    this.setData({
      page:1,
      flag:true,
      list:[],
    })
    this.changeF()
  },
  goUrl(e){
    if(e.currentTarget.dataset.url == '/pages/decoration/cooperativeConfirm/cooperativeConfirm' || e.currentTarget.dataset.url == '/pages/decoration/cooperativeDetails/cooperativeDetails'){
      app.globalData.cooperationData = this.data.list[e.currentTarget.dataset.index]
    }
    app.goUrl(e.currentTarget.dataset.url)
  },
  
  //发起合作
  apply(e){
    app.ajaxToken('/shop/launchcooperation/'+app.globalData.userData.ShopID+'/'+e.currentTarget.dataset.id,'','post').then(res=>{
      if(res.status == 0){
        wx.showToast({
          title: res.msg,
          icon:'none'
        })
        setTimeout(()=>{
          this.setData({
            page:1,
            flag:true,
            list:[]
          })
          this.changeF()
        },1500)
      }else{
        wx.showToast({
          title: res.msg,
          icon:'none'
        })
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