// pages/decoration/teamManagement/teamManagement.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list : [],
    textList : [
      {
        name : '设计团队',
        id : 1
      },
      {
        name : '施工团队',
        id : 2
      },
    ],
    //默认设计团队
    type:1,
    page:1,
    total:0,
    keyword:''
  },
  getList(e){
    var index = e.detail.index
    this.setData({
      type:this.data.textList[index].id,
      page:1,
      keyword:''
    })
    this.getUser()
  },
  inputvalue(e){
    this.setData({
      keyword:e.detail,
      list:[],
    })
    this.getUser()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '团队管理'
    })
  },
  //滚动条到底
  scroll(e){
    console.log(e)
  },
  //获取列表
  getUser(){
    var data={
      type:this.data.type,
      keyword:this.data.keyword,
      page:this.data.page,
      pagesize:10,
    }
    app.ajaxToken('/shop/getteamlist/'+app.globalData.userData.ShopID,data,'get').then(res=>{
      console.log(res)
      if(res.status == 0){
        this.setData({
          total:res.totalitem,
          list:this.data.list.concat(res.data)
        })
      }else{
        wx.showToast({
          title:res.msg,
          icon:'none'
        })
      }
    })
  },
  
  goUrl(e){
    app.goUrl(e.currentTarget.dataset.url+'?type='+String(this.data.type))
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