// pages/decoration/secondaryManage/secondaryManage.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleList: ['全部', '上架', '下架'],
    formData:{
      page : 1,
      pagesize : 10,
      keyword : ''
    },
    load : false,
    //初始化索引
    index:0,
    //列表arr
    tabIndex : '',
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '辅材管理',
    })
  },
  listChange(e){
    if(!isNaN(e.detail.index)){
      if(e.detail.index == this.data.index) return
      this.setData({
        index : e.detail.index,
        'formData.page' : 1,
        tabIndex : e.detail.index == 1 ? 1 : e.detail.index == 2 ? 0 : '',
        list : []
      })
    }else{
      this.setData({
        'formData.page' : 1,
        'formData.keyword' : e.detail.value,
        list : []
      })
    }
    this.getList()
  },
  loadresh(){
    this.setData({
      'formData.page' : 1,
      list : [],
    })
    this.getList()
  },
  getList() {
    var that = this
    // type 1:上架 0:下架 不传则为全部
    var data = {
      page : this.data.formData.page,
      pagesize : this.data.formData.pagesize,
      ground : this.data.tabIndex,
      keyword : this.data.formData.keyword
    }
    app.ajaxToken('/shop/getproductlist/' + app.globalData.userData.ShopID, data, 'get').then(res => {
      if(res.status == 0){
        if(res.pagecount == 0){
          that.setData({
            load : false,
          })
          return
        }
        if(that.data.formData.page <= res.pagecount){
          that.setData({
            load : false,
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
  goUrl(e) {
    app.goUrl(e.currentTarget.dataset.url)
  },
  deleteSecondary(e){
    var that = this
    console.log(e)
    var data = {
      ids : [e.currentTarget.dataset.id]
    }
    wx.showModal({
      title: '提示',
      content: '确定删除这张图片吗',
      success (res) {
        if (res.confirm) {
          app.ajaxToken('/shop/delproducts/' + app.globalData.userData.ShopID, data, 'delete').then(res => {
              wx.showToast({
                title: '删除成功',
              })
              that.loadresh()
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
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
    this.loadresh()
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