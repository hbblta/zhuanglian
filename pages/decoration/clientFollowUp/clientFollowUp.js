// pages/decoration/clientFollowUp/clientFollowUp.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textList:['客户动态','客户统计','TA的订单','TA的跟进'],
    textListIndex:0,
    followList:[],
    //动态列表
    movelist:[],
    page:1,
    flag:true,
    pagecount:0,
    //ta的订单
    herlist:[],

  },
  //获取跟进列表
  getfollow(){
    app.ajaxToken('/shop/getcustomertracklist/'+app.globalData.userData.ShopID+'/'+this.data.id,'','get').then(res=>{
      this.setData({
        followList:res.data
      })
    })
  },
  //获取客户统计
  getcount(){
    app.ajaxToken('/shop/getcustomerstatlist/'+app.globalData.userData.ShopID+'/'+this.data.id,'','get').then(res=>{
       this.setData({
         countobj:res.data
       })
    })
  },
  //获取客户动态
  getmove(){
    app.ajaxToken('/shop/getcustomerbrowselist/'+app.globalData.userData.ShopID+'/'+this.data.id+'?page='+this.data.page,'','get').then(res=>{
       this.setData({
         movelist:this.data.movelist.concat(res.data),
         flag:true,
         pagecount:res.pagecount
       })
    })
  },
  //获取订单
  getlist(){
    app.ajaxToken('/shop/getcustomerorderlist/'+app.globalData.userData.ShopID+'/'+this.data.id,'','get').then(res=>{
       this.setData({
         herlist:res.data
       })
    })

  },
  changeIndex(e){
    this.setData({
      textListIndex:e.currentTarget.dataset.index
    })
    this.changeF()
  },
  scorll(){
    //只有获取动态存在page
    if(this.data.textListIndex == 0){
       if(this.data.pagecount>this.data.page){
         if(this.data.flag){
          this.setData({
            page:this.data.page+1,
            flag:false
          })
          this.getmove()
         }
        
       }
    }
  },
  changeF(){
    var index = this.data.textListIndex
    this.setData({
      page:1,
      flag:true,

    })
    if(index == 0){
      this.setData({
        page:1,
        movelist:[],
        flag:true
      })
     this.getmove()
    }
    if(index == 1){
     this.getcount()
    }
    if(index == 2){
      this.getlist()
    }
    if(index == 3){
      this.getfollow()
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '客户详情'
    })
    this.setData({
      id:options.id,
      textListIndex:options.idx?options.idx:0
    })
    let pages = getCurrentPages();
    let current = pages[pages.length - 2];
    this.setData({
      item: current.data.nowobj
    })

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
    if(this.data.textListIndex){
      this.getfollow()
    }else{
      this.getmove()
    }
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