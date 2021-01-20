// pages/decoration/constructionMessage/constructionMessage.js
const app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData : {
      trackId : '',
      content : '',
      imageUrl : []
    },
    url : ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.type == 'followUp'){
      this.setData({
        url :'/shop/messageordertrack/'
      })
    }else{
      this.setData({
        url : '/shop/messagetrack/'
      })
      
    }
    this.setData({
      'formData.trackId' : options.TrackID
    })
  },
  getImagePath(e){//获取组件图片
    this.setData({
      'formData.imageUrl' : e.detail.imageList
    })
  },
  contentText(e){
    this.setData({
      'formData.content':e.detail.value
    })
  },
  submit(){
    var data = {
      trackId : this.data.formData.trackId,
      content  :this.data.formData.content,
      imageUrl : this.data.formData.imageUrl.map((data)=>{return data.SaveName}),
    }
    app.ajaxToken(this.data.url+app.globalData.userData.ShopID,data, 'post').then(res => {
      wx.hideLoading()
      wx.showToast({
        title: '提交成功',
      })
      setTimeout(()=>{
        wx.navigateBack({
          delta: 1,
        })
      },1000)
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