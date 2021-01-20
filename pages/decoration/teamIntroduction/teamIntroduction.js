// pages/decoration/teamIntroduction/teamIntroduction.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listOne:[],
    listTwo : [],
    ShopID : ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '团队介绍',
    })
    this.setData({
      ShopID : options.ShopID
    })
    this.getList()
  },
  getList(){
    var dataOne = {
      shopId  : this.data.ShopID,
      type : 1
    }
    var dataTwo = {
      shopId  : this.data.ShopID,
      type : 2
    }
    app.ajaxToken('/store/getteamlist/'+this.data.ShopID,dataOne,'get').then(res=>{
      this.setData({
        listOne : res.data
      })
    })
    app.ajaxToken('/store/getteamlist/'+this.data.ShopID,dataTwo,'get').then(res=>{
      this.setData({
        listTwo : res.data
      })
    })
  },
  goUrl(e){
    app.goUrl(e.currentTarget.dataset.url+'?teamid='+e.currentTarget.dataset.id+'&type=show'+'&ShopID='+this.data.ShopID)
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