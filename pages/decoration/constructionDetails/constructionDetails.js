// pages/decoration/constructionDetails/constructionDetails.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
     scheduleList:[
       {
         name: '浇底',
         id:0
       },
       {
         name: '改造',
         id:1
       },
       {
         name: '水电',
         id:2
       },
       {
         name: '泥工',
         id:3
       },
       {
         name: '木工',
         id:4
       },
       {
         name: '油漆',
         id:5
       },
       {
         name: '安装',
         id:6
       },
       {
         name: '验收',
         id:7
       },
       {
         name: '完成',
         id:8
       },
     ],
     ConstructionID : '',
     constructionData : {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      scheduleNum : '50%',
      ConstructionID:options.ConstructionID 
    })
    this.getscheduleList()
    this.getInfo()
    this.getStaffList()
  },
  getscheduleList(){
    app.ajaxToken('/common/getconstructionstates','','get').then(res=>{
      this.setData({
        scheduleList : res.data
      })
    })
  },
  getStaffList(){
    app.getStaffList(res=>{
      this.setData({
        userlist:  res
      })
    })
  },
  getInfo(){
    app.ajaxToken('/shop/getconstructiondetail/'+app.globalData.userData.ShopID+'/'+this.data.ConstructionID,'','get').then(res=>{
      this.setData({
        constructionData : res.data
      })
    })
  },
  bindPickerChange1: function(e) {
    this.setData({
      'constructionData.ProjectManager': this.data.userlist[e.detail.value].UserID
    })
    this.refreshOrder()
  },
  bindPickerChange2: function(e) {
    this.setData({
      'constructionData.DesignerID': this.data.userlist[e.detail.value].UserID
    })
    this.refreshOrder()
  },
  bindPickerChange3: function(e) {
    this.setData({
      'constructionData.TrackerID': this.data.userlist[e.detail.value].UserID
    })
    this.refreshOrder()
  },
  changeIsShow(){
    this.setData({
      'constructionData.IsShow': this.data.constructionData.IsShow ? 0 : 1
    })
    this.refreshOrder()
  },
  refreshOrder(){
    var data = {
      IsShow : this.data.constructionData.IsShow,
      TrackerID : this.data.constructionData.TrackerID ? this.data.constructionData.TrackerID : app.globalData.userData.UserID,
      DesignerID : this.data.constructionData.DesignerID ? this.data.constructionData.DesignerID : app.globalData.userData.UserID,
      ProjectManager : this.data.constructionData.ProjectManager ? this.data.constructionData.ProjectManager : app.globalData.userData.UserID,
    }
    app.ajaxToken('/shop/allocconstruction/'+app.globalData.userData.ShopID+'/'+this.data.ConstructionID,data,'post').then(res=>{
      this.getInfo()
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  goUrl(e){
    app.goUrl(e.currentTarget.dataset.url)
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