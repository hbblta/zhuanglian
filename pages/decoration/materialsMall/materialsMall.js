// pages/decoration/effectPictureChecklistGm/effectPictureChecklistGm.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    materialsList : [],
    materialsKeyword : '',
    materialsType : 0,
    ShopID : '',
    textList : [],
    list: [],
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '材料商城',
    })
    this.setData({
      ShopID : options.ShopID
    })
    this.getRightList()
    this.getMaterialsList()
    this.getList({detail:{index:0}})
  },
  getMaterialsList(){
    var data = {
      keyword : this.data.materialsKeyword
    }
    app.ajaxToken('/store/getmaterialshops/' + this.data.ShopID, data, 'get').then(res => {
      this.setData({
        materialsList : res.data,
      })
    })
  },
  changType(e){
    this.setData({
      materialsType : e.currentTarget.dataset.type
    })
  },
  listChange(e){
    this.setData({
      materialsKeyword : e.detail.value,
      list : []
    })
    this.getMaterialsList()
  },
  getRightList(){
    this.setData({
      textList : app.globalData.categoryList,
    })
  },
  getList(e) {
    if(!isNaN(e.detail.index)){
      this.setData({
        list : this.data.textList[e.detail.index].children
      })
    }
  },
  goUrl(e) {
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