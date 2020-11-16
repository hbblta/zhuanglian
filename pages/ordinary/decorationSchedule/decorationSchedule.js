// pages/ordinary/decorationSchedule/decorationSchedule.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textList : [],
    decorationArray:{
      textList: ['设计不满意','价格太高','产品没实样','其他原因'],
      idList: [0,1,2,3]
     },
     formData:{
      page : 1,
      pagesize : 10,
      keyword : '',
      state : ''
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '装修预定',
    })
    this.getTextList()
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
  },
  getTextList(){
    let textList = []
    app.ajaxToken('/common/getdecorationorderstates','get').then(res=>{
      res.data.map(data=>{textList.push({name:data.text})})
      this.setData({
        textList : textList,
        scheduleList : res.data
      })
      this.getList({detail:{index:0}})
    })
  },
  inputvalue(e){
    this.setData({
      'formData.keyword' : e.detail
    })
    this.getListData()
  },
  getList(e){
    var that = this
    if(e.detail.type){
      if(e.detail.type == 'loadresh'){
        this.setData({
          'formData.page' : 1,
          'formData.keyword' : '',
        })
      }
      this.getListData()
    }else{
      this.setData({
        'formData.keyword' : '',
        'formData.page' : 1,
        'formData.state' : that.data.scheduleList[e.detail.index].value
      })
      this.getListData()
    }
  },
  getListData(){
    var that = this
    var data = {
      page : this.data.formData.page,
      pagesize :  this.data.formData.pagesize,
      keyword :  this.data.formData.keyword,
      state : this.data.formData.state
    }
    app.ajaxToken('/user/decorationorderlist/'+app.globalData.userData.UserID,data,'get').then(res=>{
      if(res.status == 0){
        if(res.pagecount == 0){
          return
        }
        if(that.data.formData.page <= res.pagecount){
          that.setData({
            list:res.data,
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