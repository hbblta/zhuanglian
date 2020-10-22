// pages/decoration/personnelDetailsAdd/personnelDetailsAdd.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
     fglist:[],
     fglistIndex:0,
     uploadImgList:[],
     fgname:'',
     flag:true,
     name:'',
     area:'',
     houseHolds:'',
     vrImageUrl:'',
  },
  getname(e){
    this.setData({
      name:e.detail.value
    })
  },
  getarea(e){
    this.setData({
      area:e.detail.value
    })
  },
  gethouse(e){
    this.setData({
      houseHolds:e.detail.value
    })
  },
  getvr(e){
    this.setData({
      vrImageUrls:e.detail.value
    })
  },
  getImagePath(e){//获取组件图片
    this.setData({
      uploadImgList  : e.detail
    })
    console.log(this.data.uploadImgList)
  },
  getImagePath2(e){
    this.setData({
      uploadImgList2  : e.detail
    })
    console.log(this.data.uploadImgList2)
  },
  submit(){//提交
    if(!this.data.name){
      this.shows('请填写作品案例名称')
      return
    }
    if(!this.data.area){
      this.shows('请填写面积')
      return
    }
    if(!this.data.houseHolds){
      this.shows('请填写户型')
      return
    }
    if(!this.data.fgname){
      this.shows('请选择风格')
      return
    }
    if(!this.data.uploadImgList.length){
      this.shows('请选择主图')
      return
    }
    var data = {
      teamID:this.data.teamid,
      caseName:this.data.name,
      area:this.data.area,
      styleID:this.data.fglist[this.data.fglistIndex.value],
      houseHolds:this.data.houseHolds,
      vrImageUrl:this.data.vrImageUrl
    }
    var that = this
    wx.showLoading({
      title: '提交中',
      mask: true
    })
    this.callback(this.data.uploadImgList,(res)=>{
      var data = {
        // materialName : this.data.fromData.materialName,
        // categoryID : this.data.getcategoriesList[this.data.getcategoriesShowIndex].value,
        // brand : this.data.fromData.brand,
        // modelNubmer : this.data.fromData.modelNubmer,
        // content : this.data.fromData.content,
        // isGround : this.data.fromData.isGround ? 1 : 0,
        // images : res
      }
      app.ajaxToken('/shop/addproduct/'+app.globalData.userData.ShopID,data, 'post').then(res => {
        wx.hideLoading()
        wx.showToast({
          title: '发布成功',
        })
        setTimeout(()=>{
          wx.navigateBack({
            delta: 1,
          })
        },1000)
      })
    })
  },
  callback(list,callFn){//上传图片
    var that = this
    var arr = []
    for(let i in list){
      wx.uploadFile({
        url: app.globalData.httpUrl + '/common/uploadproduct',
        filePath: list[i],
        name: 'file',
        header: {
          "Authorization": app.globalData.Authorization
        },
        success: function (res) {
          arr.push(JSON.parse(res.data).data.SaveName)
          if(arr.length - 1 == i){
            callFn(arr)
          }
        }
      })
    }
    //输入你先需要执行完的逻辑
  },
  shows(str){
    wx.showToast({
      title: str,
      icon:'none',
      mask:true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      teamid:options.teamid
    })
    this.getfg()
  },
  //风格
  getfg(){
    app.ajaxToken('/common/getstyles','','get').then(res=>{
      this.setData({
        fglist:res.data
      })
      console.log(this.data.fglist)
    })
  },
  bindPickerChange: function(e) {
    this.setData({
      fgname:this.data.fglist[e.detail.value].text,
      fglistIndex:e.detail.value
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