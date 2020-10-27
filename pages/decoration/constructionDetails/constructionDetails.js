// pages/decoration/constructionDetails/constructionDetails.js
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
     scheduleNum:'0%',
     scheduleList:[
       {
         name: '浇底',
         id:0
       },
       {
         name: '改造',
         id:1
       },
       {
         name: '水电',
         id:2
       },
       {
         name: '泥工',
         id:3
       },
       {
         name: '木工',
         id:4
       },
       {
         name: '油漆',
         id:5
       },
       {
         name: '安装',
         id:6
       },
       {
         name: '验收',
         id:7
       },
       {
         name: '完成',
         id:8
       },
     ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      scheduleNum : '50%',
      id:options.id
    })
    this.getInfo()
  },
  getInfo(){
    app.ajaxToken('/shop/getconstructiondetail/'+app.globalData.userData.ShopID+'/'+this.data.id,'','get').then(res=>{
      console.log(res)
    })
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  goUrl(e){
    app.goUrl(e.currentTarget.dataset.url)
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