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
    imageList:{
      type: Array,
      value: [],
    },
    imageType: {
      type: Number,
      value: -1
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  pageLifetimes: {
    show: function() {
      // 页面被展示
      if(app.globalData.cropperImg != '' && this.data.imageType == app.globalData.cropperImg.imageType){
        this.data.imageList.push(app.globalData.cropperImg)
        this.triggerEvent('getImagePath',{
          imageList :this.data.imageList,
          imageType : app.globalData.cropperImg.imageType
        })
        setTimeout(()=>{
          app.globalData.cropperImg = ''
        },400)
      }
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
            var imageType = that.data.imageList[e.currentTarget.dataset.index].imageType
            that.data.imageList.splice(e.currentTarget.dataset.index,1)
            that.triggerEvent('getImagePath',{
              imageList :that.data.imageList,
              imageType : imageType
            })
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
        count: that.data.imageLength - that.data.imageList.length, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          app.goUrl('/pages/ordinary/imageCropper/imageCropper?imagUrl='+res.tempFilePaths[0]+'&imageType='+that.data.imageType)
        }
      })
    },
  }
})