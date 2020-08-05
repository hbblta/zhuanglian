// pages/decoration/effectPicture/effectPicture.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //渲染的list
    list:[
      {url:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=910527016,2220695787&fm=26&gp=0.jpg',name:'胡彬彬',phone:'12345678910',tema:'20人',entryTime:'2020/05/30'},
      {url:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3085552352,556493802&fm=26&gp=0.jpg',name:'胡彬彬',phone:'12345678910',tema:'20人',entryTime:'2020/05/30'},
      {url:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3943584555,2366501618&fm=15&gp=0.jpg',name:'胡彬彬',phone:'12345678910',tema:'20人',entryTime:'2020/05/30'},
      {url:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1877257905,591130638&fm=15&gp=0.jpg',name:'胡彬彬',phone:'12345678910',tema:'20人',entryTime:'2020/05/30'},
      {url:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3842853828,78964374&fm=26&gp=0.jpg',name:'胡彬彬',phone:'12345678910',tema:'20人',entryTime:'2020/05/30'},
      {url:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=978984144,3008825592&fm=26&gp=0.jpg',name:'胡彬彬',phone:'12345678910',tema:'20人',entryTime:'2020/05/30'},
      {url:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1719075638,1065027568&fm=26&gp=0.jpg',name:'胡彬彬',phone:'12345678910',tema:'20人',entryTime:'2020/05/30'},
      {url:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1829272418,1951610969&fm=15&gp=0.jpg',name:'胡彬彬',phone:'12345678910',tema:'20人',entryTime:'2020/05/30'}
    ],
    //当前左边tab项
    textIndex:0,
    textList: [{
        name: '全部',
        length: 10,
        id: 0
      },
      {
        name: '交底',
        length: 3,
        id: 0
      },
      {
        name: '泥工',
        length: 1,
        id: 0
      },
      {
        name: '全部',
        length: 10,
        id: 0
      },
      {
        name: '全部',
        length: 10,
        id: 0
      },
      {
        name: '全部',
        length: 10,
        id: 0
      },
      {
        name: '全部',
        length: 10,
        id: 0
      },
      {
        name: '全部（10）',
        length: 10,
        id: 0
      },
      {
        name: '全部（10）',
        length: 10,
        id: 0
      },
      {
        name: '全部（10）',
        length: 10,
        id: 0
      },
    ],
  },
  //当前tab选项
  getList(e){
    this.setData({
      textIndex:e.detail.index
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '施工管理'
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