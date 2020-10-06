// pages/decoration/articlePromote/articlePromote.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleList:['全部1','全部10','全部3','全部2','全部5','全部4']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      ShopID:app.globalData.userData.ShopID
    })
    this.getInfo()
  },
  getInfo(){
    app.ajaxToken('/shop/addcustomercategory/'+this.data.ShopID,{shopId:this.data.ShopID},'post').then(res => {//获取文章列表
      console.log(res)
    })
  },
  goUrl(e){
    app.goUrl(e.currentTarget.dataset.url)
  },
  getList(e){
    console.log(e.detail)
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