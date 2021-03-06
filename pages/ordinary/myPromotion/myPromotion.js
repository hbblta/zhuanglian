// pages/ordinary/effectCollection/effectCollection.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url : '',
    formData:{
      page : 1,
      pagesize : 10,
    },
    load : false,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      url : options.url
    })
    this.loadresh()
    wx.setNavigationBarTitle({
      title: '我的推广',
    })
  },
  loadresh(){
    this.setData({
      'formData.page' : 1,
      list : [],
    })
    this.getList()
  },
  getList() {
    var that = this
    // type 1:上架 0:下架 不传则为全部
    var data = {
      page : this.data.formData.page,
      pagesize : this.data.formData.pagesize,
    }
    app.ajaxToken('/user/getcommendqrcodes/'+app.globalData.userData.UserID, data, 'get').then(res => {
      if(res.status == 0){
        if(res.pagecount == 0){
          that.setData({
            load : false,
          })
          return
        }
        if(that.data.formData.page <= res.pagecount){
          that.setData({
            load : false,
            list:this.data.list.concat(res.data),
            'formData.page' : that.data.formData.page + 1
          })
        }
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