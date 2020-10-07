// pages/decoration/workreport/workreport.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    phone:'',
    //详细地址
    address:'',
    //选择的地区
    area:'',
    //选择的地区id
    areaid:'',
    //项目经理
    objectArray: [
      {
        id: 0,
        name: '中国'
      },
      {
        id: 1,
        name: '美国'
      },
      {
        id: 2,
        name: '德国'
      },
      {
        id: 3,
        name: '法国'
      }
    ],
    //设计师
    objectArray2: [
      {
        id: 0,
        name: '中国'
      },
      {
        id: 1,
        name: '美国'
      },
      {
        id: 2,
        name: '德国'
      },
      {
        id: 3,
        name: '法国'
      }
    ],
    //跟单人
    objectArray3: [
      {
        id: 0,
        name: '中国'
      },
      {
        id: 1,
        name: '美国'
      },
      {
        id: 2,
        name: '德国'
      },
      {
        id: 3,
        name: '法国'
      }
    ],
    objectIndex: 0,//默认显示位置
    objectIndex2: 0,
    objectIndex3: 0,
    value1:'',
    value2:'',
    value3:'',
    //传给后端的id 项目经理 设计师 跟单人
    id1:'',
    id2:'',
    id3:''
  },
  bindPickerChange(e){
    this.setData({
      value1:this.data.objectArray[e.detail.value].name,
      id1:this.data.objectArray[e.detail.value].id
    })
  },
  bindPickerChange2(e){
    this.setData({
      value2:this.data.objectArray[e.detail.value].name,
      id2:this.data.objectArray[e.detail.value].id
    })
  },
  bindPickerChange3(e){
    this.setData({
      value3:this.data.objectArray[e.detail.value].name,
      id3:this.data.objectArray[e.detail.value].id
    })
  },
  getNameValue(e){
    this.setData({
      name:e.detail.value
    })
  },
  getPhoneValue(e){
    this.setData({
      phone:e.detail.value
    })
  },
  getAddressValue(e){
    this.setData({
      address:e.detail.value
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
    var userId = app.globalData.userData.UserID
    if(!this.data.name){
      wx.showToast({
        title: '请先输入姓名',
        icon:'none'
      })
      return
    }
    if(!this.data.phone){
      wx.showToast({
        title: '请先输入电话',
        icon:'none'
      })
      return
    }
    if(!this.data.areaid){
      wx.showToast({
        title: '请先选择地区',
        icon:'none'
      })
      return
    }
    if(!this.data.address){
      wx.showToast({
        title: '请先填入详细地址',
        icon:'none'
      })
      return
    }
    if(!this.data.value1){
      wx.showToast({
        title: '请先选择项目经理',
        icon:'none'
      })
      return
    }
    if(!this.data.value3){
      wx.showToast({
        title: '请先选择跟单人',
        icon:'none'
      })
      return
    }
    //必填
    // var data = {
    //   realName:this.data.name,
    //   mobile:this.data.phone,
    //   areaID:this.data.areaid,
    //   address:this.data.address,
    //   projectManager:this.data.value1,
    //   trackerID:this.data.value3
    // }
    var data = {
      realName:this.data.name,
      mobile:this.data.phone,
      areaID:this.data.areaid,
      address:this.data.address,
      projectManager:userId,
      trackerID:userId
    }
    //非必填
    if(this.data.value2){
      // data.designerID = this.data.value2
      data.designerID = userId
    }
    app.ajaxToken('/shop/reportconstruction/'+app.globalData.userData.ShopID,data,'post').then(res=>{
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '工地报备'
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