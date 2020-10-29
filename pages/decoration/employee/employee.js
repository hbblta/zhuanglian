// pages/decoration/employee/employee.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commissionType : 0,
    list:[],
    keyword:'',
    page:1,
    totalitem:0,
    flag:true,
    nowObj:{}
  },
  getvalue(e){
    this.setData({
      keyword:e.detail.value,
      page:1,
      flag:true,
      totalitem:0,
      list:[]
    })
    this.getUser()
  },
  scroll(e){
    if(this.data.page * 10>this.data.totalitem){
      return
    }else{
      if(this.data.flag){
        //接口请求不成功 不改变flag
        this.setData({
          page:this.data.page++,
          flag:false
        })
        this.getUser()
      }
    }
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '员工管理',
    })
  },
  changeCommissionType(e){
    this.setData({
      commissionType : e.currentTarget.dataset.commissiontype,
      page:1,
      list:[],
      totalitem:0,
      keyword:'',
      flag:true
    })
    this.getUser()
  },
  goUrl(e){
    var index = e.currentTarget.dataset.index
    this.setData({
      nowObj:this.data.list[index]
    })
    app.goUrl(e.currentTarget.dataset.url)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // delete(e){
  //   var id = e.currentTarget.dataset.id
  //   app.ajaxToken('/shop/delstaff/'+app.globalData.userData.ShopID+'/'+id,'','delete').then(res=>{
  //     console.log(res)
  //   })
  // },
  getUser(){
    var data = {
      keyword:this.data.keyword,
      state:this.data.commissionType==1?0:2,
      page:this.data.page,
    }
    app.ajaxToken('/shop/getstafflist/'+app.globalData.userData.ShopID,data,'get').then(res=>{
      this.setData({
        list:this.data.list.concat(res.data),
        totalitem:res.totalitem,
        flag:true
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      list:[],
      page:1
    })
    this.getUser()
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