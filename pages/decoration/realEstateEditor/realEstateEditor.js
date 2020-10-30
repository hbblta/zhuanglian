// pages/decoration/realEstateEditor/realEstateEditor.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textListIndex:-1,
    textList : [
      {
        name : '户型一',
        id : 0
      },
      {
        name : '户型二',
        id : 1
      },
    ],
    windowHeight : 0,
    formData : {
      basisData : {
        propertyName : '',
        PropertyImage : [],
        isGround : true,
        PropertyShowImage : []
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({  
      success: (res) => {
        this.setData({
          windowHeight: (res.windowHeight * (750 / res.windowWidth))
        })
      },
    })
    wx.setNavigationBarTitle({
      title: '楼盘编辑',
    })
  },
  goUrl(e){
    app.goUrl(e.currentTarget.dataset.url)
  },
  changIndex(e){
    this.setData({
      textListIndex : e.currentTarget.dataset.index
    })
  },
  propertyNameChange(e){
    this.setData({
      'formData.basisData.propertyName' : e.detail.value
    })
  },
  changeIsGround(){//上下架更改状态
    this.setData({
      'formData.basisData.isGround' : !this.data.formData.basisData.isGround
    })
  },
  getImagePath(e){//获取组件图片
    this.setData({
      'formData.basisData.PropertyShowImage'  : e.detail
    })
  },
  submit(){//提交
    var that = this
    // wx.showLoading({
    //   title: '提交中',
    //   mask: true
    // })
    this.callback(this.data.formData.basisData.PropertyShowImage,(res)=>{
      var data = {
        basisData : {
          PropertyImage : res,
          propertyName : that.data.formData.basisData.propertyName,
          isGround : this.data.formData.basisData.isGround
        }
      }
      console.log(data)
      // app.ajaxToken('/shop/addproduct/'+app.globalData.userData.ShopID,data, 'post').then(res => {
      //   wx.hideLoading()
      //   wx.showToast({
      //     title: '发布成功',
      //   })
      //   setTimeout(()=>{
      //     wx.navigateBack({
      //       delta: 1,
      //     })
      //   },1000)
      // })
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
          if(list.length - 1 == i){
            callFn(arr)
          }
        }
      })
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