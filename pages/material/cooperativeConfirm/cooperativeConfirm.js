// pages/material/cooperativeConfirm/cooperativeConfirm.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    decorationArray:{
      textList: ['放弃原因1','放弃原因2','放弃原因3','放弃原因4'],
      idList: [0,1,2,3]
     },
     cooperationData : {}
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var data = {
      AuditID : this.data.cooperationData.AuditID,
      Reason : this.data.decorationArray.textList[e.detail.value]
    }
    app.ajaxToken('/materialshop/cooperationback/'+app.globalData.userData.MaterialShopID,data,'post').then(res=>{
      if(res.status == 0){
        wx.showToast({
          title: res.msg,
        })
      }
    })
  },
  goUrl(e){
    app.goUrl(e.currentTarget.dataset.url)
  },
  submit(){
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定合作吗',
      success (res) {
        if (res.confirm) {
          if(that.data.cooperationData.State == 2){
            app.ajaxToken('/materialshop/cooperationpass/'+app.globalData.userData.MaterialShopID+'/'+that.data.cooperationData.AuditID,'','post').then(res=>{
              if(res.status == 0){
                wx.showToast({
                  title: res.msg,
                  icon : 'none'
                })
              }
            })
          }else{
            app.ajaxToken('/materialshop/launchcooperation/'+app.globalData.userData.MaterialShopID+'/'+that.data.cooperationData.ShopID,'','post').then(res=>{
              if(res.status == 0){
                wx.showToast({
                  title: res.msg,
                })
              }
            })
          }

          
          
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      cooperationData : app.globalData.cooperationData
    })
    console.log(app.globalData.cooperationData)
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