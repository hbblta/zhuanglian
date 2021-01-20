// pages/decoration/constructionReport/constructionReport.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId : '',
    formData : {
      Summary : '',
      SummaryImages : [],
      Plan : '',
      PlanImages : [],
      PlanFinishDate : '',
      IsFinish : false
    },
    OrderID : '',
    url : '',
    reportLength : 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '汇报',
    })
    if(options.OrderID){
      this.setData({
        url: '/shop/reportordertrack/'+app.globalData.userData.ShopID+'/'+options.OrderID,
        OrderID : options.OrderID,
        reportLength : options.reportLength - 0
      })
    }else{
      this.setData({
        url: '/shop/reportcustomertrack/'+app.globalData.userData.ShopID+'/'+options.userId,
        userId : options.userId
      })
    }
  },
  getImagePath(e){//获取组件图片
    if(e.detail.imageType == '-1'){
      this.setData({
        'formData.SummaryImages' : e.detail.imageList
      })
    }else if(e.detail.imageType == '1'){
      this.setData({
        'formData.PlanImages' : e.detail.imageList
      })
    }
  },
  bindPickerChange(e) {
    this.setData({
      'formData.PlanFinishDate': e.detail.value
    })
  },
  summaryText(e){
    this.setData({
      'formData.Summary':e.detail.value
    })
  },
  planText(e){
    this.setData({
      'formData.Plan':e.detail.value
    })
  },
  changeIsFinish(){
    this.setData({
      'formData.IsFinish': !this.data.formData.IsFinish
    })
  },
  submit(){
    var data = {
      Plan : this.data.formData.Plan,
      PlanImages : this.data.formData.PlanImages.map((data)=>{return data.SaveName}),
    }
    if(this.data.reportLength){
      data.Summary = this.data.formData.Summary
      data.SummaryImages =  this.data.formData.SummaryImages.map((data)=>{return data.SaveName})
    }
    if(this.data.formData.IsFinish) data.IsFinish = 1
    if(this.data.formData.PlanFinishDate) data.PlanFinishDate = this.data.formData.PlanFinishDate
    app.ajaxToken(this.data.url,data, 'post').then(res => {
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