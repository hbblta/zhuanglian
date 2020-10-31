// pages/decoration/workreport/workreport.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fromData:{
      realName:'',
      mobile:'',
      address:'',
    },
    //选择的地区
    area:'',
    //选择的地区id
    areaid:'',
    userlist:[],
    //设计师
    designerID:'',
    //项目经理
    projectManager:'',
    //跟单员
    trackerID:''
  },
  bindPickerChange1(e){
    this.setData({
      projectManager:e.detail.value
    })
  },
  bindPickerChange2(e){
    this.setData({
      designerID:e.detail.value
    })
  },
  bindPickerChange3(e){
    this.setData({
      trackerID:e.detail.value
    })
  },
  getvalue(e){
    var fromData = JSON.parse(JSON.stringify(this.data.fromData))
    fromData[e.currentTarget.dataset.key] = e.detail.value
    this.setData({
      fromData : fromData
    })
  },
  changearea(e){
    this.setData({
      area:e.detail.name,
      areaid:e.detail.id
    })
  },
  goback(){
    var userId = app.globalData.userData.UserID
    var datas = this.data.fromData
    if(!datas.mobile){
      wx.showToast({
        title: '请先输入电话',
        icon:'none'
      })
      return
    }
    if(!datas.realName){
      wx.showToast({
        title: '请先输入姓名',
        icon:'none'
      })
      return
    }
    if(!datas.address){
      wx.showToast({
        title: '请先填入详细地址',
        icon:'none'
      })
      return
    }
    var data = {
      ...datas
    }
    if(!this.data.areaid){
      wx.showToast({
        title: '请先选择地区',
        icon:'none'
      })
      return
    }
    if(!this.data.trackerID){
      wx.showToast({
        title: '请先选择跟单人',
        icon:'none'
      })
      return
    }
    if(!this.data.projectManager){
      wx.showToast({
        title: '请先选择项目经理',
        icon:'none'
      })
      return
    }
    var data = {
      ...datas
    }
    data.areaID = this.data.areaid
    data.projectManager = this.data.userlist[this.data.projectManager].UserID
    data.trackerID = this.data.userlist[this.data.trackerID].UserID
    //非必填
    if(this.data.designerID){
      data.designerID = this.data.userlist[this.data.designerID].UserID
    }
    app.ajaxToken('/shop/reportconstruction/'+app.globalData.userData.ShopID,data,'post').then(res=>{
      if(res.status == 0){
        wx.showToast({
          title: res.msg,
        })
      }else{
        wx.showToast({
          title: res.msg,
          icon:'none'
        })
      }
      setTimeout(()=>{
        wx.navigateBack()
      },2000)
    })
    //
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '工地报备'
    })
    this.getUser()
  },
  //员工列表
  getUser(){
    var data={
      page:1,
      pagesize:50,
      state:2
    }
    app.ajaxToken('/shop/getstafflist/'+app.globalData.userData.ShopID,data,'get').then(res=>{
      this.setData({
        userlist:res.data
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