// pages/decoration/teamManagement/teamManagement.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list : [],
    textList : [
      {
        name : '设计团队',
        id : 1
      },
      {
        name : '施工团队',
        id : 2
      },
    ],
    //默认设计团队
    type:1,
    page:1,
    total:0,
    keyword:''
  },
  getList(e){
    var index = e.detail.index
    var type = this.data.type
    if(type == this.data.textList[index].id)return
    this.setData({
      type:this.data.textList[index].id,
      page:1,
      keyword:'',
      list:[]
    })
    this.getUser()
  },
  inputvalue(e){
    this.setData({
      keyword:e.detail,
      list:[],
    })
    this.getUser()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '团队管理'
    })
  },
  delete(e){
    var id = e.currentTarget.dataset.id
    app.ajaxToken('/shop/delteam/'+app.globalData.userData.ShopID+'/'+id,'','delete').then(res=>{
      if(res.status == 0){
        wx.showToast({
          title: res.msg,
          mask:true,
        })
        setTimeout(()=>{
          this.setData({
            page:1,
            list:[]
          })
          this.getUser()
        },1000)
      }else{
        wx.showToast({
          title: res.msg,
          icon:'none'
        })
      }
    })
  },
  //滚动条到底
  scroll(e){
    if(this.data.total<=this.data.page * 10){
      return
    }else{
      this.setData({
        page:Number(this.data.page)+1
      })
      this.getUser()
    }
  },
  //获取列表
  getUser(){
    var data={
      type:this.data.type,
      keyword:this.data.keyword,
      page:this.data.page,
      pagesize:10,
    }
    app.ajaxToken('/shop/getteamlist/'+app.globalData.userData.ShopID,data,'get').then(res=>{
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
  
  goUrl(e){
    if(e.currentTarget.dataset.type == 'add'){
      //添加新成员
     app.goUrl(e.currentTarget.dataset.url+'?type='+String(this.data.type))
    }else{
     app.goUrl(e.currentTarget.dataset.url+'?teamid='+e.currentTarget.dataset.id)
    }
    return
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
    this.setData({
      list:[]
    })
    this.getUser()
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