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
    imageType: {//如果当前页面uploadImage组件在list中渲染，或者图片上传需要在多个数组中选渲染需要用到index需要传递index进来，如果当前页面就一个uploadImage组件则不需要传或者传-1即可
      type: Number,
      value: -1
    },
    // effectImages : {
    //   type: Boolean,
    //   value: false,
    // }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // styleListText : [],
    // styleList : []
  },

  /**
   * 组件的方法列表
   */
  lifetimes: {
    attached: function() {
      // if(this.data.effectImages){
      //   app.ajaxToken('/common/getstyles', 'get').then(res => {
      //     this.setData({
      //       styleListText : res.data.map((data)=>{return data.text}),
      //       styleList : res.data
      //     })
      //   })
      // }
      // 在组件实例进入页面节点树时执行
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  pageLifetimes: {
    show: function() {
      // 页面被展示
      this.initImg()
    },
    hide: function() {
      // 页面被隐藏
    },
    resize: function(size) {
      // 页面尺寸变化
    }
  },
  methods: {
    // bindPickerChange(e){
    //   this.setData({
    //     'styleData.effectName' :  this.data.styleListText[e.detail.value],
    //     'styleData.style' : this.data.styleList[e.detail.value].value,
    //   })
    // },
    deleteImg(e){//删除图片
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
    upload(e) {//上传图片
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
    initImg(){
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
    }
  }
})