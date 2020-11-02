// pages/ordinary/imageCropper/imageCropper.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '',
    width: 250, //宽度
    height: 250, //高度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.imagUrl)
    //获取到image-cropper实例
    this.cropper = this.selectComponent("#image-cropper");
    //开始裁剪
    this.setData({
      src: options.imagUrl,
      imageType : options.imageType
    });
    wx.showLoading({
      title: '加载中'
    })
  },
  getImg(){
    var that = this
    wx.showLoading({
      title: '上传中',
      mask:true
    })
    this.cropper = this.selectComponent("#image-cropper");
    this.cropper.getImg((obj)=>{ //裁剪获取图片方法
      wx.uploadFile({
        url: app.globalData.httpUrl + '/common/uploadproduct',
        filePath: obj.url,
        name: 'file',
        header: {
          "Authorization": app.globalData.Authorization
        },
        success: function (res) {
          app.globalData.cropperImg = {
            FileUrl : JSON.parse(res.data).data.FileUrl,
            SaveName : JSON.parse(res.data).data.SaveName,
            imageType : that.data.imageType
          }
          wx.hideLoading()
          wx.navigateBack({
            delta: 1 
          })
        }
      })
    })
  },
  cropperload(e) {
    console.log("cropper初始化完成");
  },
  loadimage(e) {
    console.log("图片加载完成", e.detail);
    wx.hideLoading();
    //重置图片角度、缩放、位置
    this.cropper.imgReset();
  },
  clickcut(e) {
    console.log(e.detail);
    //点击裁剪框阅览图片
    wx.previewImage({
      current: e.detail.url, // 当前显示图片的http链接
      urls: [e.detail.url] // 需要预览的图片http链接列表
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