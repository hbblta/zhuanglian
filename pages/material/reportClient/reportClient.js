// pages/decoration/workreport/workreport.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData:{
      realName:'',
      mobile:'',
      address:'',
      area:'',
      budget:'',
    },
    sexIndex:'',
    sexarr:[
      {id:1,name:'男'},
      {id:2,name:'女'},
    ],
    fgIndex:'',
    fglist:[],
    cateIndex:'',
    catearr:[
      {id:1,name:'是'},
      {id:2,name:'否'}
    ],
    isunIndex:'',
    isunarr:[
      {id:1,name:'是'},
      {id:2,name:'否'}
    ],
    userIndex:'',
    userlist:[]
  },
  bindPickerChange1(e){
    this.setData({
      sexIndex:e.detail.value
    })
  },
  bindPickerChange2(e){
    this.setData({
      fgIndex:e.detail.value
    })
  },
  bindPickerChange3(e){
    this.setData({
      userIndex:e.detail.value
    })
  },
  bindPickerChange4(e){
    this.setData({
      cateIndex:e.detail.value
    })
  },
  bindPickerChange5(e){
    this.setData({
      isunIndex:e.detail.value
    })
  },
  changearea(e){
    console.log(e)
    this.setData({
      area:e.detail.name,
      areaid:e.detail.id
    })
  },
  goback(){
    var datas = this.data.formData
    if(!datas.area){
      wx.showToast({
        title: '请先输入面积',
        icon:'none'
      })
      return
    }
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
    
    var data = {
      ...datas
    }
    if(this.data.areaid){
      data.areaID = this.data.areaid
    }
    if(this.data.sexIndex){
      data.sex = this.data.sexarr[this.data.sexIndex].id
    }
    if(this.data.fgIndex){
      data.styleID = this.data.fglist[this.data.fgIndex].value
    }
    if(this.data.userIndex){
      data.managerID = this.data.userlist[this.data.userIndex].UserID
    }
    if(datas.address){
      data.address = datas.address
    }
    if(datas.budget){
      data.budget =datas.budget
    }
    if(this.data.isunIndex){
      data.isUnderstand = this.data.isunarr[this.data.isunIndex].id
    }
    if(this.data.cateIndex){
      data.isCommunicate = this.data.catearr[this.data.cateIndex].id
    }
    app.ajaxToken('/shop/reportcustomer/'+app.globalData.userData.ShopID,data,'post').then(res=>{
      console.log(res)
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
  getvalue(e){
    var formData = JSON.parse(JSON.stringify(this.data.formData))
    formData[e.currentTarget.dataset.key] = e.detail.value
    this.setData({
      formData : formData
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '报备客户'
    })
    this.getfg()
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
  getfg(){
    app.ajaxToken('/common/getstyles', '', 'get').then(res => {
      this.setData({
        fglist: res.data
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