// pages/decoration/promoteCode/promoteCode.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList : [],
    imgIndex : 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的推广码'
    })
    this.getImg()
  },
  getImg(){
    app.ajaxToken('/common/getcommendimage/2', '', 'get').then(res => {
      this.setData({
        imgList : res.data
      })
    })
  },
  imgChange(){
    if(this.data.imgList.length == 0){
      wx.showToast({
        title: '暂未设置图片',
        icon: 'none',
        duration: 2000
      });
      return
    }
    if((this.data.imgIndex + 1) == this.data.imgList.length){
      this.setData({
        imgIndex : 0
      })
    }else{
      this.setData({
        imgIndex : this.data.imgIndex + 1
      })
    }
  },
  saveImage() {
    if(this.data.imgList.length == 0){
      wx.showToast({
        title: '暂未设置图片',
        icon: 'none',
        duration: 2000
      });
      return
    }
    wepy.showLoading({
      title: '保存中...', 
      mask: true,
    });
    wx.downloadFile({
      url:this.data.imgList[this.data.imgIndex],
      success: function(res) {
        if (res.statusCode === 200) {
          let img = res.tempFilePath;
          wx.saveImageToPhotosAlbum({
            filePath: img,
            success(res) {
              wepy.showToast({
                title: '保存成功',
                icon: 'success',
                duration: 2000
              });
            },
            fail(res) {
              wepy.showToast({
                title: '保存失败',
                icon: 'success',
                duration: 2000
              });
            }
          });
        }
      }
    });
  },
  shareImg(){
    if(this.data.imgList.length == 0){
      wx.showToast({
        title: '暂未设置图片',
        icon: 'none',
        duration: 2000
      });
      return
    }
    var that = this
    wx.previewImage({
      urls: this.data.imgList[this.data.imgIndex],
      success:res=>{
        wx.showToast({
          icon : 'none',
          title: '长按发送给微信好友',
        })
        that.setData({
          showPosterBol : false
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