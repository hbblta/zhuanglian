// pages/decoration/effectPictureChecklistGm/effectPictureChecklistGm.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleList: ['全部', '上架', '下架'],
    formData:{
      page : 1,
      pagesize : 10,
      keyword : ''
    },
    load : false,
    //初始化索引
    index:0,
    //列表arr
    tabIndex : '',
    list: [],
    tabShow : false,
    selectList : []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '辅材管理',
    })
    this.setData({//获取全局清单并，删除全局已拥有清单，以用于卸载页面时合并
      selectList : app.globalData.styleListData.styleData.materials[0]
    })
  },
  listChange(e){
    if(e.detail.index){
      if(e.detail.index == this.data.index) return
      this.setData({
        index : e.detail.index,
        'formData.page' : 1,
        tabIndex : e.detail.index == 1 ? 1 : e.detail.index == 2 ? 0 : '',
        list : []
      })
    }else{
      this.setData({
        'formData.page' : 1,
        'formData.keyword' : e.detail.value,
        list : []
      })
    }
    this.getList()
  },
  loadresh(){
    this.setData({
      'formData.page' : 1,
      list : [],
    })
    this.getList()
  },
  getList() {
    var that = this
    // type 1:上架 0:下架 不传则为全部
    var data = {
      page : this.data.formData.page,
      pagesize : this.data.formData.pagesize,
      ground : 1,
      keyword : this.data.formData.keyword
    }
    app.ajaxToken('/shop/getproductlist/' + app.globalData.userData.ShopID, data, 'get').then(res => {
      if(res.status == 0){
        var selectListId = that.data.selectList.map(data=>{return data.MaterialID})
        res.data.forEach(item => {
          if(selectListId.includes(item.MaterialID)){
            item.selected = true
          }else{
            item.selected = false
          }
        });
        if(res.pagecount == 0){
          that.setData({
            load : false,
          })
          return
        }
        if(that.data.formData.page <= res.pagecount){
          that.setData({
            load : false,
            list:res.data,
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
  goUrl(e) {
    app.goUrl(e.currentTarget.dataset.url)
  },
  selectThis(e){
    var updateData = `list[${e.currentTarget.dataset.index}].selected`
    this.setData({
      [updateData] : !this.data.list[e.currentTarget.dataset.index].selected
    })
    if(this.data.list[e.currentTarget.dataset.index].selected){
      wx.showToast({
        title: '选择成功',
        mask : true
      })
      var selectList = this.data.selectList
      selectList.push(this.data.list[e.currentTarget.dataset.index])
      this.setData({
        selectList
      })
    }else{
      wx.showToast({
        title: '取消成功',
        mask : true,
        icon:'none'
      })
      var selectList = this.data.selectList
      for(let i in selectList){
        console.log(i)
        if(selectList[i].MaterialID == e.currentTarget.dataset.id){
          selectList.splice(i,1)
        }
      }
      this.setData({
        selectList
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
    setTimeout(()=>{
      this.loadresh()
    },500)
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
    app.globalData.styleListData.styleData.materials[0] = this.data.selectList
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