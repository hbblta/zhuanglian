// pages/decoration/assignCustomers/assignCustomers.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData:{
      page : 1,
      pagesize : 10,
    },
    load : false,
    list: [],
    staffList : [],
    customersType:false,
    distributionList : [],
    nowStaffIndex : 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '客户分配',
    })
    this.loadresh()
    this.getStaffList()
  },
  getStaffList(){
    app.getStaffList(res=>{
      this.setData({
        staffList :  res
      })
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
    var data = {
      shopId : app.globalData.userData.ShopID,
      manager : app.globalData.userData.UserID,
      page : this.data.formData.page,
      pagesize : this.data.formData.pagesize,
    }
    app.ajaxToken('/shop/getcustomerlist/'+ app.globalData.userData.ShopID, data, 'get').then(res => {
      if(res.pagecount == 0){
        that.setData({
          load : false,
        })
        return
      }
      if(that.data.formData.page <= res.pagecount){
        for(let i in res.data){
          res.data[i].selected = false
        }
        that.setData({
          load : false,
          list:this.data.list.concat(res.data),
          'formData.page' : that.data.formData.page + 1
        })
      }
    })
  },
  changeCustomers(){
    var that = this
    this.setData({
      customersType : true
    })
    var distributionList = []
    this.data.list.forEach(item=>{
      if(item.selected){
        distributionList.push(item.UserID)
      }
    })
    this.setData({
      distributionList
    })
  },
  distribution(e){
    var kay = `list[${e.currentTarget.dataset.index}].selected`
    this.setData({
      [kay] : !this.data.list[e.currentTarget.dataset.index].selected
    })
  },
  nowStaff(e){
    this.setData({
      nowStaffIndex : e.currentTarget.dataset.index
    })
  },
  sumbit(){
    var data = {
      UserIDs : this.data.distributionList,
      ManagerID : this.data.staffList[this.data.nowStaffIndex].UserID
    }
    app.ajaxToken('/shop/alloccustomer/'+ app.globalData.userData.ShopID, data, 'post').then(res => {
      wx.showToast({
        title: '分配成功',
        icon : 'none'
      })
      wx.navigateBack({
        delta: 1,
      })
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