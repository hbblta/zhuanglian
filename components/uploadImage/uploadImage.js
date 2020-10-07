// components/uploadimage/uploadimage.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imageLength: {
      type: Number,
      value: 9
    },
    imageType: {
      type: String,
      value: 'all'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    nowImgList: [],
  },

  /**
   * 组件的方法列表
   */
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
    },
    detached: function() {
      app.globalData.cropperImgist = []
      // 在组件实例被从页面节点树移除时执行
    },
  },
  pageLifetimes: {
    show: function() {
      // 页面被展示
      this.setData({
        nowImgList : app.globalData.cropperImgist
      })
      this.triggerEvent('getImagePath',this.data.nowImgList)
    },
    hide: function() {
      // 页面被隐藏
    },
    resize: function(size) {
      // 页面尺寸变化
    }
  },
  methods: {
    deleteImg(e){
      var that = this
      wx.showModal({
        title: '提示',
        content: '确定删除这张图片吗',
        success (res) {
          if (res.confirm) {
            var imageList = JSON.parse(JSON.stringify(that.data.nowImgList))
            imageList.splice(e.currentTarget.dataset.index,1)
            that.setData({
              nowImgList : imageList
            })
            app.globalData.cropperImgist = imageList
            that.triggerEvent('getImagePath',imageList)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })

    },
    //上传图片
    upload(e) {
      var that = this;
      wx.chooseImage({
        count: that.data.imageLength - that.data.nowImgList.length, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          app.goUrl('/pages/ordinary/imageCropper/imageCropper?imagUrl='+res.tempFilePaths[0])
        }
      })
    },
  }
})