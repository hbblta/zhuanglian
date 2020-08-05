// pages/decoration/percentageSet/percentageSet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:[
      {tip:'分销直推提成',list:[{title:'平方设置',text:'按平方设置 如每平方：40元'},{title:'平方设置',text:'按平方设置 如每平方：40元'}]},
      {tip:'分销直推提成',list:[{title:'平方设置',text:'按平方设置 如每平方：40元'},{title:'平方设置',text:'按平方设置 如每平方：40元'}]},
      {tip:'分销直推提成',list:[{title:'平方设置',text:'按平方设置 如每平方：40元'},{title:'平方设置',text:'按平方设置 如每平方：40元'}]},
      {tip:'分销直推提成',list:[{title:'平方设置',text:'按平方设置 如每平方：40元'},{title:'平方设置',text:'按平方设置 如每平方：40元'}]},
      {tip:'分销直推提成',list:[{title:'平方设置',text:'按平方设置 如每平方：40元'},{title:'平方设置',text:'按平方设置 如每平方：40元'}]},
      {tip:'分销直推提成',list:[{title:'平方设置',text:'按平方设置 如每平方：40元'},{title:'平方设置',text:'按平方设置 如每平方：40元'}]},
    ]
  },
  //当前点击的内容
  change(e){
    var num = e.currentTarget.dataset.num
    var index = e.currentTarget.dataset.index
    console.log('当前点击content的低'+num+'项中的第'+index+'项text')
  },
  //点击了确定按钮
  sure(){
    console.log('老子点了确定')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '提成设置',
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