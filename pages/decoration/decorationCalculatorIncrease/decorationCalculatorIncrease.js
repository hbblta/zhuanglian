// pages/decoration/decorationCalculatorIncrease/decorationCalculatorIncrease.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    calaData : []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.ajaxToken('/shop/getbudgets/'+app.globalData.userData.ShopID, '', 'get').then(res => {
      this.setData({
        calaData : res.data
      })
    })
  },
  addIncrease(){
    var calaData = this.data.calaData
    var data = {
      BudgetName : '档次'+calaData.length,
      Price : 0,
    }
    calaData.push(data)
    this.setData({
      calaData
    })
  },
  deleteData(e){
    console.log(e)
    var calaData = this.data.calaData
    calaData.splice(e.currentTarget.dataset.index,1)
    this.setData({
      calaData
    }) 
  },
  priceChange(e){
    var changeData = `calaData[${e.currentTarget.dataset.index}].Price`
    this.setData({
      [changeData] : e.detail.value
    })
  },
  nameChange(e){
    var changeData = `calaData[${e.currentTarget.dataset.index}].BudgetName`
    this.setData({
      [changeData] : e.detail.value
    })
  },
  sumit(){
    let data = this.data.calaData
    app.ajaxToken('/shop/savebudgets/'+app.globalData.userData.ShopID,data, 'post').then(res => {
      if(res.status == 0){
        wx.showToast({
          title: res.msg,
        })
        setTimeout(()=>{
          wx.navigateBack({
            delta: 1,
          })
        },500)

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