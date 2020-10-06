// pages/decoration/secondaryManage/secondaryManage.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleList: ['全部', '上架', '下架'],
    //页面 页面数量
    page: 1,
    pagesize: 10,
    //初始化索引
    index:0,
    //列表arr
    listArr: [{
        url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3941061157,1232986362&fm=26&gp=0.jpg',
        name: '胡彬彬',
        pinpai: '圣象',
        num: '122',
        statu: 0
      },
      {
        url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3941061157,1232986362&fm=26&gp=0.jpg',
        name: '胡彬彬',
        pinpai: '圣象',
        num: '122',
        statu: 1
      },
      {
        url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3941061157,1232986362&fm=26&gp=0.jpg',
        name: '胡彬彬',
        pinpai: '圣象',
        num: '122',
        statu: 1
      },
      {
        url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3941061157,1232986362&fm=26&gp=0.jpg',
        name: '胡彬彬',
        pinpai: '圣象',
        num: '122',
        statu: 0
      },
      {
        url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3941061157,1232986362&fm=26&gp=0.jpg',
        name: '胡彬彬',
        pinpai: '圣象',
        num: '122',
        statu: 0
      },
      {
        url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3941061157,1232986362&fm=26&gp=0.jpg',
        name: '胡彬彬',
        pinpai: '圣象',
        num: '122',
        statu: 1
      },
      {
        url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3941061157,1232986362&fm=26&gp=0.jpg',
        name: '胡彬彬',
        pinpai: '圣象',
        num: '122',
        statu: 0
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '辅材管理',
    })
    this.getList()
  },
  getLists(e){
    if(e.detail.index == this.data.index){
      return
    }else{
      //初始化请求参数
      this.setData({
        index:e.detail.index,
        page:1,
        pagesize:10
      })
    }
    if(e.detail.index){
      if(e.detail.index == 2){
        this.getList('0')
      }else{
        this.getList(1)
      }
    }else{
      this.getList()
    }
  },
  getList(type) {
    // type 1:上架 0:下架 不传则为全部
    var data = {}
    data.page = this.data.page
    data.pagesize = this.data.pagesize
    if (type) data.ground = type
    app.ajaxToken('/shop/getproductlist/' + app.globalData.userData.ShopID, data, 'get').then(res => {
      console.log(res)
      if(res.status == 0){
        this.setData({
          listArr:res.data
        })
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