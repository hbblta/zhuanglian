// pages/decoration/articlePromote/articlePromote.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleList:[],
    getcategoriesList : [],
    list : [],
    fromData:{
      page : 1,
      pagesize : 10,
      keyword : '',
    },
    classIdIndex:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      ShopID:app.globalData.userData.ShopID
    })
    app.ajaxToken('/common/getnewsclass', '', 'get').then(res => {
      let arr = JSON.parse(res.data).map((data)=>{
        return data.label
      })
      this.setData({
        getcategoriesList : JSON.parse(res.data),
        titleList : arr
      })
      this.getList()
    })
  },
  goUrl(e){
    app.goUrl(e.currentTarget.dataset.url)
  },
  listChange(e){
    if(e.detail.index){
      if(e.detail.index == this.data.index) return
      this.setData({
        classIdIndex : e.detail.index,
        'fromData.page' : 1,
        list : [],
      })
    }
    if(e.detail.value){
      this.setData({
        'fromData.keyword' : e.detail.value,
        'fromData.page' : 1,
        list : [],
      })
    }
    this.getList()
  },
  loadresh(){
    this.setData({
      'fromData.page' : 1,
      list : [],
    })
    this.getList()
  },
  getList() {
    var that = this
    var data = {
      page : this.data.fromData.page,
      pagesize : this.data.fromData.pagesize,
      classId : this.data.getcategoriesList[this.data.classIdIndex].value,
      keyword : this.data.fromData.keyword
    }
    app.ajaxToken('/shop/getnews/' + app.globalData.userData.ShopID, data, 'get').then(res => {
      if(res.status == 0){
        if(that.data.fromData.page <= res.pagecount){
          that.setData({
            load : false,
            list : this.data.list.concat(res.data),
            'fromData.page' : that.data.fromData.page + 1
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