// pages/decoration/effectPicture/effectPicture.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //开始 / 结束时间
    starttime:'',
    endtime:'',
    //渲染的list
    list:[
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
  startchange(e){
    this.setData({
      starttime:e.detail.value
    })
    if(this.data.endtime){
      this.setData({
        list:[]
      })
      this.getUser()
    }
  },
  endchange(e){
    this.setData({
      endtime:e.detail.value
    })
    if(this.data.starttime){
      this.setData({
        list:[]
      })
      this.getUser()
    }
  },
  inputvalue(e){
    this.setData({
      keyword:e.detail,
      list:[],
    })
    this.getUser()
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
  //滚动条
  scroll(e){
    if(this.data.total<=this.data.page*10){
      return
    }
    if(this.data.total>this.data.page*10){
      this.setData({
        page:this.data.page++
      })
      this.getUser()
    }
  },
  //得到右边的客户列表 初始化
  getUser(state){
    var data = {}
    //关键字
    data.keyword = this.data.keyword
    data.state = this.data.textList[this.data.textIndex].State
    data.page = this.data.page
    data.pagesize = this.data.pagesize
    data.begindate = this.data.starttime
    data.enddate = this.data.endtime
    app.ajaxToken('/shop/getconstructionlist/'+app.globalData.userData.ShopID,data,'get').then( res =>{
      console.log(res)
      if(res.status == 0){
        this.setData({
          total:res.totalitem,
          list:this.data.list.concat(res.data)
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
      keyword:'',
      endtime:'',
      starttime:'',
      list:[]
    })
    this.getUser(this.data.textList[index].State)
  },
  //跳转报备按钮
  goto(e){
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
    var id = e.currentTarget.dataset.id
    app.goUrl(e.currentTarget.dataset.url+'?id='+id)
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
    if(this.data.list.length){
      this.setData({
        list:[]
      })
    }
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