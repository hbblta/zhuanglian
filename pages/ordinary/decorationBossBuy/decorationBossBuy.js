// pages/ordinary/decorationBossBuy/decorationBossBuy.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    multiArray: [[['全国','全国','全国'],['全国','全国','全国']],['全国','全国','全国']],
    multiIndex: [0, 0, 0],
    decorationBossBuyList:[],//价格列表
    swiperIndex:0, 
    selecteUser:true,//用户协议
    userData:{},
    company:'',//公司名称,
    code:'',
  },
  changearea(e){
    console.log(e,'当前选择')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.setNavigationBarTitle({
      title: '注册'
    })
    this.setData({
      userData : app.globalData.userData
    })
    var data = {
      costType : options.costType
    }
    app.ajaxToken('/common/getcostsettings', data, 'get').then(res => {//获取价格列表
      this.setData({
        decorationBossBuyList : res.data
      })
    })
    wx.login({
      success: res => {
        that.setData({
          code : res.code
        })
      }
    })
  
  
  },
 
  showrange(){
    this.setData({
      showrange:true
    })
  },
  nowChange(e){//swiper动态改变
    console.log(e)
    if(e.detail.source){
      this.setData({
        swiperIndex : e.detail.current
      })
    }else{
      this.setData({
        swiperIndex : e.currentTarget.dataset.current
      })
    }
  },
  selecteChange(){//用户协议
    this.setData({
      selecteUser : !this.data.selecteUser
    })
  },
  
  companyInput:function(e){//company记录
    this.setData({
      company:e.detail.value
    })
  },
  payButton(e){
    console.log(e)
    if(this.data.company == ''){
      wx.showToast({
        title: '请填写公司名称',
        icon :'none'
      })
      return
    }
    if(!this.data.selecteUser){
      wx.showToast({
        title: '请勾选用户条款',
        icon :'none'
      })
      return
    }
    var data = {
      userId : this.data.userData.UserID,
      costId : this.data.decorationBossBuyList[this.data.swiperIndex].CostID,
      companyName : this.data.company,
      areaId : 3509,
      encryptedData:e.detail.encryptedData,
      iv : e.detail.iv,
      code:this.data.code
    }
    app.ajaxToken('/user/registershop', data, 'post').then(res => {//获取价格列表
      console.log(res)
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