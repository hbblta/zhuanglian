// pages/decoration/personnelDetails/personnelDetails.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:'',
    savesrc:'',
    name:'',
    year:'',
    //设计团队1 施工团队2
    type:-1,
    sjs:'',
    sort:'',
    perception:'',
    workingExperience:'',
  },
  getName(e){
    this.setData({
      name:e.detail.value
    })
  },
  getYear(e){
    this.setData({
      year:e.detail.value
    })
  },
  getSjs(e){
    this.setData({
      sjs:e.detail.value
    })
  },
  getSort(e){
    this.setData({
      sort:e.detail.value
    })
  },
  getgw(e){
    this.setData({
      perception:e.detail.value
    })
  },
  getwork(e){
    this.setData({
      workingExperience:e.detail.value
    })
  },
  add(){
    if(this.data.teamid){
      app.goUrl('/pages/decoration/personnelDetailsAdd/personnelDetailsAdd?teamid='+this.data.teamid)
    }else{
      wx.showToast({
        title: '请先点击下方确定添加人员哦',
        icon:'none',
        mask:true
      })
    }
  },
  sure(){
    if(!this.data.name){
      this.shows('请输入姓名')
      return
    }
    if(!this.data.src){
      this.shows('请选择头像')
      return
    }
    if(!this.data.sjs){
      this.shows('请输入职务')
      return
    }
    if(!this.data.sort){
      this.shows('请输入店铺内排序')
      return
    }
    if(!this.data.year){
      this.shows('请输入工作年限')
      return
    }
    var data={
      teamType:this.data.type,
      realName:this.data.name,
      avatar:this.data.savesrc,
      post:this.data.sjs,
      sortKey:this.data.sort,
      workingYears:this.data.year,
      perception:this.data.perception,
      workingExperience:this.data.workingExperience
    } 
    //修改 编辑 人员ID
    if(this.data.teamid){
      data.teamID = this.data.teamid
    }
    app.ajaxToken('/shop/addteam/'+app.globalData.userData.ShopID,data,'post').then(res=>{
      if(res.status == 0){
        if(this.data.teamid){
          wx.showToast({
            title: '修改成功',
          })
        }else{
          wx.showToast({
            title: '添加成功',
          })
        }
        setTimeout(()=>{
          wx.navigateBack()
        },1500)
      }else{
        wx.showToast({
          title: res.msg,
          icon:'none'
        })
      }
    })
    
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
     type:options.type,
     teamid:options.teamid
    })
    //编辑
    if(options.teamid){
      var pages = getCurrentPages()
      var prevPage = pages[pages.length - 2]
      var info = prevPage.data.info
      this.setData({
        src:info.AvatarUrl,
        savesrc:info.Avatar,
        name:info.RealName,
        year:info.WorkingYears,
        perception:info.Perception,
        sjs:info.Post,
        sort:info.SortKey,
        workingExperience:info.WorkingExperience
      })
    }
  },
  goUrl(e){
    app.goUrl(e.currentTarget.dataset.url+'?teamid='+this.data.teamid)
  },

  upload(){
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        wx.showToast({
          title: '上传中...',
          icon:'loading'
        })
        wx.uploadFile({
          url: app.globalData.httpUrl + '/common/uploadimage',
          filePath: res.tempFilePaths[0],
          name: 'file',
          header: {
            "Authorization": app.globalData.Authorization
          },
          success: function (res) {
            console.log(res)
            if(res.statusCode == 200){
              wx.showToast({
                title: '上传成功',
              })
              that.setData({
                src:JSON.parse(res.data).data.FileUrl,
                savesrc:JSON.parse(res.data).data.SaveName
              })
            }
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
  getDetail(){
    app.ajaxToken('/shop/getteamdetail/'+app.globalData.userData.ShopID+'/'+this.data.teamid,'','get').then(res=>{
       this.setData({
         info:res.data
       })
    })

  },
  onShow: function () {
    if(this.data.teamid){
      this.getDetail()
    }
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