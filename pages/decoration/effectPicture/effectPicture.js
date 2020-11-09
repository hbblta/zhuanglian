// pages/decoration/effectPicture/effectPicture.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list : 0,
    textList : [
      {
        name : '楼盘案例',
        id : 0
      },
      {
        name : '效果案例',
        id : 1
      },
    ],
    //当前的tabIndex
    tabIndex:0,
    //楼盘 page
    page:1,
    pagesize:10,
    keyword:'',
    //效果 page
    page2:1,
    pagesize2:10,
    keyword2:'',
    //类别 默认全部
    ground:'',
    groundIndex:0
  },
  getList(e){
    this.setData({
      tabIndex:e.detail.index,
      groundIndex:0,
      ground:'',
      keyword:'',
      keyword2:'',
      page:1,
      page2:1,
      pagesize2:10,
      pagesize:10
    })
    if(e.detail.index == 0){
      this.getlp()
    }
    if(e.detail.index == 1){
      this.getxg()
    }
  },
  act(e){
    var index = e.currentTarget.dataset.index
    var ground = ''
    if(index){
      if(index == 1){
        ground='1'
      }
      if(index == 2){
        ground='0'
      }
    }
    this.setData({
      groundIndex:index,
      ground
    })
    if(this.data.tabIndex){
      this.getxg(ground)
    }else{
      this.getlp(ground)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '效果图管理'
    }) 
    this.getlp()
  },
  //楼盘案例列表 初始化
  getlp(ground){
    var data = {
      page:this.data.page,
      pagesize:this.data.pagesize,
      keyword:this.data.keyword
    }
    if(ground)data.ground=ground
    app.ajaxToken('/shop/getcaselist/'+app.globalData.userData.ShopID,data,'get').then(res=>{
      this.setData({
        list : res.data
      })
    })
  },
  //楼盘列表 参数化

  //效果案例
  getxg(ground){
    var data = {
      page:this.data.page2,
      pagesize:this.data.pagesize2,
      keyword:this.data.keyword
    }
    if(ground)data.ground=ground
    app.ajaxToken('/shop/geteffectlist/'+app.globalData.userData.ShopID,data,'get').then(res=>{
      this.setData({
        list : res.data
      })
      console.log(res)
    })
  },
  deleteEffect(e){
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定删除吗',
      success (res) {
        if (res.confirm) {
          app.ajaxToken('/shop/delcase/'+app.globalData.userData.ShopID + '/' + that.data.list[e.currentTarget.dataset.index].CaseID,'','delete').then(res=>{
            that.getlp()
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
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