// pages/decoration/cooperative/cooperative.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    textListIndex:0,
    commissiontype:0,
    textList:[
      {
        name : '合作材料',
        id: 1
      },
      {
        name : '待审合作',
        id: 1
      },
      {
        name : '发起合作',
        id: 2
      },
    ],
    area:'',
    areaid:'',
    keyword:'',
    page:1,
    pagecount:0,
    list:[]
  },
  getvalue(e){
    this.setData({
      keyword:e.detail.value,
      flag:true,
      page:1,
      list:[]
    })
    this.changeF()
  },
  scroll(e){
    if(this.data.pagecount>this.data.page){
      if(this.data.flag){
        this.setData({
          flag:false,
          page:this.data.page+1
        })
        this.changeF()
      }
    }else{
      return
    }
  },
  //当前执行哪种获取数据方法
  changeF(){
      if(this.data.textListIndex == 0){
        this.getcl()
      }
      if(this.data.textListIndex == 1){
        this.getds()
      }
      if(this.data.textListIndex == 2){
        this.getfq()
      }
  },
  changearea(e){
    this.setData({
      area:e.detail.name,
      areaid:e.detail.id,
      page:1,
      pagecount:0,
      flag:true,
      list:[]
    })
    this.changeF()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '合作管理',
    })
    //获取合作材料
    this.getcl()
  },
  changeIndex(e){
    if(e.currentTarget.dataset.index == this.data.textListIndex)return
    this.setData({
      textListIndex : e.currentTarget.dataset.index,
      commissiontype:0
    })
    console.log(this.data.textListIndex,this.data.commissiontype)
  },
  //获取合作材料
  getcl(){
    var data={
      page:this.data.page,
      keyword:this.data.keyword
    }
    data.type = this.data.commissiontype?2:1
    if(this.data.areaid){
      data.area = this.data.areaid
    }
    app.ajaxToken('/shop/getcooperationlist/'+app.globalData.userData.ShopID,data,'get').then(res=>{
      console.log(res)
      this.setData({
        list:this.data.list.concat(res.data),
        flag:true,
        pagecount:res.pagecount
      })
    })
  },
  changeCommissionType(e){
    this.setData({
      commissiontype : e.currentTarget.dataset.commissiontype
    })
    console.log(this.data.textListIndex,this.data.commissiontype)
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