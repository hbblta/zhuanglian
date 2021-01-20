// pages/decoration/effectPicture/effectPicture.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list : [],
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
    formData:{
      page : 1,
      pagesize : 6,
      keyword : ''
    },
    ground : -1
  },
  getList(e){
    var that = this
    if(e.detail.type){
      if(e.detail.type == 'loadresh'){
        this.setData({
          'formData.page' : 1,
          'formData.keyword' : '',
          list : []
        })
      }
      this.getListData()
    }else{
      this.setData({
        'formData.keyword' : '',
        'formData.page' : 1,
        tabIndex : e.detail.index,
        list : []
      })
      this.getListData()
    }
  },
  act(e){
    this.setData({
      ground : e.currentTarget.dataset.index,
      list : [],
      'formData.page' : 1,
    })
    this.getListData()
  },
  inputvalue(e){
    this.setData({
      'formData.keyword':e.detail,
      'formData.page' : 1,
      list:[],
    })
    this.getListData()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '效果图管理'
    }) 
  },
  getListData(){
    var that = this
    var data = {
      page:this.data.formData.page,
      pagesize:this.data.formData.pagesize,
      keyword:this.data.formData.keyword
    }
    if(this.data.ground != -1) data.ground = this.data.ground
    var url = this.data.tabIndex == 0 ?  '/shop/getcaselist/' : '/shop/geteffectlist/'
    app.ajaxToken(url+app.globalData.userData.ShopID,data,'get').then(res=>{
      if(res.status == 0){
        if(res.pagecount == 0){
          return
        }
        if(that.data.formData.page <= res.pagecount){
          that.setData({
            list : that.data.list.concat(res.data),
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
  deleteEffect(e){
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定删除吗',
      success (res) {
        if (res.confirm) {
          var url = '' 
          if(that.data.tabIndex == 0){
            url = '/shop/delcase/'+app.globalData.userData.ShopID + '/' + that.data.list[e.currentTarget.dataset.index].CaseID
          }else{
            url = '/shop/deleffect/'+app.globalData.userData.ShopID + '/' + that.data.list[e.currentTarget.dataset.index].EffectID
          }
          app.ajaxToken(url,'','delete').then(res=>{
            that.setData({
              'formData.page' : 1,
              list:[],
            })
            that.getListData()
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
  goEditorEffect(e){
    if(this.data.tabIndex == 0){
      app.goUrl('/pages/decoration/realEstateEditor/realEstateEditor?CaseID='+this.data.list[e.currentTarget.dataset.index].CaseID)
    }else{
      app.goUrl('/pages/decoration/effectPictureEdit/effectPictureEdit?EffectID='+this.data.list[e.currentTarget.dataset.index].EffectID)
    }
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
    this.getList({detail:{type:'loadresh'}})
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