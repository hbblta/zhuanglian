// pages/decoration/secondaryManage/secondaryManage.js
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    titleList:['全部','上架','下架'],
    //列表arr
    listArr:[
      {url:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3941061157,1232986362&fm=26&gp=0.jpg',name:'胡彬彬',pinpai:'圣象',num:'122',statu:0},
      {url:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3941061157,1232986362&fm=26&gp=0.jpg',name:'胡彬彬',pinpai:'圣象',num:'122',statu:1},
      {url:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3941061157,1232986362&fm=26&gp=0.jpg',name:'胡彬彬',pinpai:'圣象',num:'122',statu:1},
      {url:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3941061157,1232986362&fm=26&gp=0.jpg',name:'胡彬彬',pinpai:'圣象',num:'122',statu:0},
      {url:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3941061157,1232986362&fm=26&gp=0.jpg',name:'胡彬彬',pinpai:'圣象',num:'122',statu:0},
      {url:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3941061157,1232986362&fm=26&gp=0.jpg',name:'胡彬彬',pinpai:'圣象',num:'122',statu:1},
      {url:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3941061157,1232986362&fm=26&gp=0.jpg',name:'胡彬彬',pinpai:'圣象',num:'122',statu:0}
    ]
  },  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     wx.setNavigationBarTitle({
       title: '辅材管理',
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