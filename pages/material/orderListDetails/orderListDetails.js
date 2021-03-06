// pages/decoration/orderListDetails/orderListDetails.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    decorationArray:{
      textList: ['张三','李四','王二','码字'],
      idList: [0,1,2,3]
     },
     list:[
       {
         status:true,
         name:'进行中',
         date:'15165/05'
       },
       {
         status:true,
         name:'进行中',
         date:'15165/05'
       },
       {
         status:false,
         name:'接单',
         date:'15165/05'
       },
       {
         status:false,
         name:'设计',
         date:'15165/05'
       },
       {
         status:false,
         name:'报价',
         date:'15165/05'
       },
       {
         status:false,
         name:'报价',
         date:'15165/05'
       },
     ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
  },
  goUrl(e){
    app.goUrl(e.currentTarget.dataset.url)
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