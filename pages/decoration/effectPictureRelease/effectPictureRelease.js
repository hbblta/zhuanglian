// pages/decoration/effectPictureRelease/effectPictureRelease.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city: '',//存放地区
    station: '',//存放维修站
    perList:'',// 存放维修人员
    multiArray: [[], [], []],
    multiIndex: [0, 0, 0],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onEditorReady()
    this.getCityStationPer();
  },
  getCityStationPer:function(){
    let that=this
    that.setData({
      city: ['一级', '一级', '一级'],//存放地区
      station: { '一级': ['二级', '无'], '一级': ['二级', '二级'], '一级': ['二级'] },//存放维修站
      perList: { '二级': ['三级', '无'], '二级': [], '二级': ['无', '三级'], '二级': ['三级', '三级'], '二级': ['无', '三级'] },// 存放维修人员
    })
    that.data.multiArray[0] = that.data.city
    that.data.multiArray[1] = this.getArr(that.data.city[0], that.data.station);
    that.data.multiArray[2] = this.getArr(that.data.multiArray[1][0], that.data.perList);
    that.setData({
      multiArray: that.data.multiArray
    })
  },
  getArr:function(value,arr){
    for (let i in arr) {
      if (value == i) {
        return arr[i]
      }
    }
  },
  bindMultiPickerChange: function (e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    let that=this
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        //第一列改变  设置第二列数据
        let arr = that.getArr(that.data.city[e.detail.value], that.data.station)
        data.multiArray[1]=arr
        that.setData({
          multiArray: data.multiArray
        })
        //从第二列中拿出第一项，设置第三组人员
        let arrColumn2 = that.getArr(arr[0], that.data.perList)
        data.multiArray[2] = arrColumn2
        that.setData({
          multiArray: data.multiArray
        })
        break;
      case 1:
         //第二列改变 设置第三列数据
        let arr2 = that.getArr(data.multiArray[1][e.detail.value], that.data.perList)
        data.multiArray[2] = arr2
        that.setData({
          multiArray: data.multiArray
        })
        break;
    }
  },
  goUrl(e){
    app.goUrl(e.currentTarget.dataset.url)
  },
  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
    }).exec()
  },
  insertImage() {
    const that = this
    wx.chooseImage({
      count: 1,
      success: function (res) {
        that.editorCtx.insertImage({
          src: res.tempFilePaths[0],
          data: {
            id: 'abcd',
            role: 'god'
          },
          width: '100%',
          success: function () {
            console.log('insert image success')
          }
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