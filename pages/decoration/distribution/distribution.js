// pages/decoration/distribution/distribution.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list : 0,
    generalIndex:0,
    textList : [
      {
        label : '分销团队',
        id : 2
      },
      {
        label : '分销审核',
        id : 0
      },
      {
        label : '团队分配',
        id : 2
      },
    ],
    //默认分销团队
    type:2,
    keyword:'',
    page:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '团队管理'
    })
    this.setData({
      generalIndex : this.selectComponent('#generalSelectionlist').data.textListIndex
    })
    this.getUser()
  },
  inputvalue(e){
    this.setData({
      keyword:e.detail,
      list:[],
      page:1,
      pagesize:10
    })
    this.getUser()
  },
  getUser(){
    var data={
      keyword:this.data.keyword,
      state:this.data.type,
      page:this.data.page,
      pagesize:10
    }
    app.ajaxToken('/shop/getdistributorlist/'+app.globalData.userData.ShopID,data,'get').then(res=>{
      console.log(res)
    })
  },
  goUrl(e){
    app.goUrl(e.currentTarget.dataset.url)
  },
  getList(e){
    var type = this.data.type
    var index = e.detail.index
    if(this.data.textList[index].id == type){
      return
    }
    this.setData({
      generalIndex : e.detail.index,
      type:this.data.textList[index].id,
      keyword:''
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