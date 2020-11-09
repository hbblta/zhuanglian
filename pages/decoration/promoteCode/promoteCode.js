// pages/decoration/promoteCode/promoteCode.js
const app = getApp()
var openStatus = true;
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
  downloadImg(){
    var that = this
    wx.downloadFile({
      url: that.data.imgList[that.data.imgIndex],
      success:function(res){
        that.saveImage(res.tempFilePath)
      }
    })
  },
  saveImage (path) {
    let that = this;
    // 获取用户是否开启用户授权相册
    if(this.data.imgList.length == 0){
      wx.showToast({
        title: '暂未设置图片',
        icon: 'none',
        duration: 2000
      });
      return
    }
    if (!openStatus) {
      wx.openSetting({
        success: (result) => {
          if (result) {
            if (result.authSetting["scope.writePhotosAlbum"] === true) {
              openStatus = true;
              wx.saveImageToPhotosAlbum({
                filePath: path,
                success() {
                  wx.showToast({
                    title: '图片保存成功，快去分享到朋友吧~',
                    icon: 'none',
                    duration: 3500
                  })
                },
                fail() {
                  wx.showToast({
                    title: '保存失败',
                    icon: 'none'
                  })
                }
              })
            }
          }
        },
        fail: () => {},
        complete: () => {}
      });
    } else {
      wx.getSetting({
        success(res) {
          // 如果没有则获取授权
          if (!res.authSetting['scope.writePhotosAlbum']) {
            wx.authorize({
              scope: 'scope.writePhotosAlbum',
              success() {
                openStatus = true
                wx.saveImageToPhotosAlbum({
                  filePath: path,
                  success() {
                    wx.showToast({
                      title: '图片保存成功，快去分享到朋友吧~',
                      icon: 'none',
                      duration: 2000
                    })
                  },
                  fail() {
                    wx.showToast({
                      title: '保存失败',
                      icon: 'none'
                    })
                  }
                })
              },
              fail() {
                // 如果用户拒绝过或没有授权，则再次打开授权窗口
                openStatus = false
                console.log('请设置允许访问相册')
                wx.showToast({
                  title: '请设置允许访问相册',
                  icon: 'none'
                })
              }
            })
          } else {
            // 有则直接保存
            openStatus = true
            wx.saveImageToPhotosAlbum({
              filePath: path,
              success() {
                wx.showToast({
                  title: '图片保存成功，快去分享到朋友吧~',
                  icon: 'none',
                  duration: 2000
                })
              },
              fail() {
                wx.showToast({
                  title: '保存失败',
                  icon: 'none'
                })
              }
            })
          }
        },
        fail(err) {
          console.log(err)
        }
      })
    }
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
      urls: [this.data.imgList[this.data.imgIndex]],
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