// pages/decoration/commodityList/commodityList.js
const app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData :{
      shopId : '',
      brand : '',
      keyword : '',
      cId : '',
      page : 1,
      pagesize : 10,
      order : ''
    },
    list:[],
    ShopID : '',
    commodityIndex : -1,
    brandList : [],
    brandTextList : []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      ShopID : options.ShopID,
      'formData.cId' : options.id
    })
    this.getList()
    this.brandList()
  },
  brandList(){
    app.ajaxToken('/store/getbrands/'+ this.data.ShopID, '', 'get').then(res => {
      this.setData({
        brandList : res.data,
        brandTextList :  res.data.map(data=>{return data.text})
      })
    })
  },
  priceSort(){
    this.setData({
      'formData.order' : this.data.formData.order == 'asc' ? this.data.formData.order = 'desc' : this.data.formData.order = 'asc',
      list : [],
      'formData.page' : 1,
    })
    this.getList()
  },
  bindPickerChange(e){
    this.setData({
      commodityIndex : e.detail.value,
      'formData.brand' : this.data.brandList[e.detail.value].value,
      list : [],
      'formData.page' : 1,
    })
    this.getList()
  },
  loadresh(){
    this.setData({
      'formData.page' : 1,
      'formData.order' : '',
      'formData.keyword' : '',
      'formData.brand' : '',
      commodityIndex : -1,
      list : []
    })
    this.getList()
  },
  getList() {
    var that = this
    var data = {
      page : this.data.formData.page,
      pagesize : this.data.formData.pagesize,
      // cId : this.data.formData.cId,
      shopId  : this.data.ShopID
    }
    if(this.data.formData.order) data.order = this.data.formData.order
    if(this.data.formData.brand) data.brand = this.data.formData.brand
    if(this.data.formData.keyword) data.keyword = this.data.formData.keyword
    app.ajaxToken('/store/getbrandmateriallist/'+ this.data.ShopID, data, 'get').then(res => {
      if(that.data.formData.page <= res.pagecount){
        that.setData({
          load : false,
          list: that.data.list.concat(res.data),
          'formData.page' : that.data.formData.page + 1
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