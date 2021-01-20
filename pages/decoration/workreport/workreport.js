// pages/decoration/workreport/workreport.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData:{
      RealName:'',
      Mobile:'',
      Address:'',
      ImageUrl : [],
      ProjectManager : '',
      TrackerID : '',
      DesignerID : ''
    },
    //选择的地区
    Area:'',
    //选择的地区id
    Areaid:'',
    userlist:[],
    //设计师
    DesignerID:'',
    //项目经理
    ProjectManager:'',
    //跟单员
    TrackerID:''
  },
  bindPickerChange1(e){
    this.setData({
      ProjectManager:e.detail.value
    })
  },
  bindPickerChange2(e){
    this.setData({
      DesignerID:e.detail.value
    })
  },
  bindPickerChange3(e){
    this.setData({
      TrackerID:e.detail.value
    })
  },
  getvalue(e){
    var formData = JSON.parse(JSON.stringify(this.data.formData))
    formData[e.currentTarget.dataset.key] = e.detail.value
    this.setData({
      formData : formData
    })
  },
  changearea(e){
    this.setData({
      Area:e.detail.name,
      Areaid:e.detail.id
    })
  },
  getImagePath(e){//获取组件图片
    if(e.detail.imageType == '-1'){
      this.setData({
        'formData.ImageUrl' : e.detail.imageList
      })
    }
  },
  goback(){
    var userId = app.globalData.userData.UserID
    var datas = this.data.formData
    if(!datas.Mobile){
      wx.showToast({
        title: '请先输入电话',
        icon:'none'
      })
      return
    }
    if(!datas.RealName){
      wx.showToast({
        title: '请先输入姓名',
        icon:'none'
      })
      return
    }
    if(!datas.Address){
      wx.showToast({
        title: '请先填入详细地址',
        icon:'none'
      })
      return
    }
    var data = {
      ...datas
    }
    if(!this.data.Areaid){
      wx.showToast({
        title: '请先选择地区',
        icon:'none'
      })
      return
    }
    if(!this.data.TrackerID){
      wx.showToast({
        title: '请先选择跟单人',
        icon:'none'
      })
      return
    }
    if(!this.data.ProjectManager){
      wx.showToast({
        title: '请先选择项目经理',
        icon:'none'
      })
      return
    }
    var data = {
      ...datas
    }
    data.AreaID = this.data.Areaid
    data.ImageUrl = this.data.formData.ImageUrl[0].SaveName
    data.ProjectManager = this.data.userlist[this.data.ProjectManager].UserID
    data.TrackerID = this.data.userlist[this.data.TrackerID].UserID
    data.DesignerID = this.data.userlist[this.data.DesignerID].UserID
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
    this.getStaffList()
  },
  //员工列表
  getStaffList(){
    app.getStaffList(res=>{
      this.setData({
        userlist :  res
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