// pages/decoration/effectPictureChecklist/effectPictureChecklist.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0,
    textList : [],
    list : [],
    auxiliaryCost : ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.reshMaterials()
    wx.showToast({
      icon:'none',
      title: '暂只支持选择辅材',
    })
  },
  goUrl(e){
    app.goUrl(e.currentTarget.dataset.url)
  },
  getList(e){
    this.setData({
      index : e.detail.index,
    })
    this.reshList()
  },
  reshMaterials(){
    if(app.globalData.styleListData.styleData.materials.length == 0){
      app.ajaxToken('/common/getcategories', 'get').then(res => {
        for(let i in res.data){
          app.globalData.styleListData.styleData.materials[i] = []
          res.data[i].name = res.data[i].text
        }
        this.setData({
          textList : res.data,
          auxiliaryCost : app.globalData.styleListData.styleData.auxiliaryCost
        })
      })
    }else{
      app.ajaxToken('/common/getcategories', 'get').then(res => {
        for(let i in res.data){
          res.data[i].name = res.data[i].text
        }
        this.setData({
          textList : res.data,
          auxiliaryCost : app.globalData.styleListData.styleData.auxiliaryCost
        })
      })
    }

  },
  reshList(){
    this.setData({
      list : app.globalData.styleListData.styleData.materials[this.data.index]
    })
  },
  priceEffect(e){
    app.globalData.styleListData.styleData.auxiliaryCost = e.detail.value
  },
  backUrl(){
    wx.navigateBack({
      delta: 1,
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
    this.reshList()
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
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.setData({
      'styleData.materials': app.globalData.styleListData.styleData.materials,
      'styleData.auxiliaryCost' : app.globalData.styleListData.styleData.auxiliaryCost
    })
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