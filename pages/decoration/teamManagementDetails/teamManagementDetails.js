// pages/decoration/teamManagementDetails/teamManagementDetails.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '详情',
    })
    this.setData({
      teamid:options.teamid
    })
  },
  getDetail(){
    app.ajaxToken('/shop/getteamdetail/'+app.globalData.userData.ShopID+'/'+this.data.teamid,'','get').then(res=>{
       this.setData({
         info:res.data
       })
    })

  },
  goUrl(e){
    app.goUrl(e.currentTarget.dataset.url+'?teamid='+this.data.teamid)
  },
  delete(e){
    var id = this.data.teamid
    app.ajaxToken('/shop/delteam/'+app.globalData.userData.ShopID+'/'+id,'','delete').then(res=>{
      if(res.status == 0){
        wx.showToast({
          title: res.msg,
          mask:true,
        })
        setTimeout(() => {
            wx.navigateBack()
        }, 1500);
     
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
    if(this.data.teamid){
      this.getDetail()
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