// pages/decoration/articlePromote/articlePromote.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleList:[],
    getcategoriesList : []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      ShopID:app.globalData.userData.ShopID
    })
    app.ajaxToken('/common/getnewsclass', '', 'get').then(res => {
      let arr = JSON.parse(res.data).map((data)=>{
        return data.label
      })
      this.setData({
        getcategoriesList : JSON.parse(res.data),
        titleList : arr
      })
    })
    this.getInfo()
  },
  getInfo(){
    var data = {
      shopId:this.data.ShopID
    }
    app.ajaxToken('/shop/getnews/'+this.data.ShopID,data,'get').then(res => {//获取文章列表
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