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
    textList: [
    ],
    page:1,
    pagesize:10,
    //关键词
    keyword:'',
    //当前返回的数据条数
    total:0
  },
  //得到左边的tab列表
  getManageList(){
    app.ajaxToken('/shop/getconstructionstat/' + app.globalData.userData.ShopID,{}, 'get').then(res => {
      var arr = res.data.States
      for(let i in arr){
        arr[i].name = arr[i].StateName
      }
      if(res.status == 0){
        this.setData({
          textList:arr
        })
        //初始化获取用户
        this.getUser(arr[this.data.textIndex].State)
      }else{
        wx.showToast({
          title: res.msg,
          icon:'none'
        })
      }
    })
  },
  //得到右边的客户列表 初始化
  getUser(state){
    var data = {}
    //关键字
    data.keyword = this.data.keyword
    data.state = this.data.textList[this.data.textIndex].State
    data.page = this.data.page
    data.pagesize = this.data.pagesize
    app.ajaxToken('/shop/getconstructionlist/'+app.globalData.userData.ShopID,data,'get').then( res =>{
      console.log(res)
      if(res.status == 0){
        this.setData({
          total:res.totalitem,
          list:res.data
        })
      }else{
        wx.showToast({
          title:res.msg,
          icon:'none'
        })
      }
    })
  },
  //当前tab选项
  getList(e){
    var index = e.detail.index
    //初始化搜索参数
    this.setData({
      textIndex:index,
      page:1,
      pagesize:10,
      total:0,
      keyword:''
    })
    this.getUser(this.data.textList[index].State)
  },
  //跳转报备按钮
  goto(){
    app.goUrl('/pages/decoration/workreport/workreport')
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
    this.getManageList()
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