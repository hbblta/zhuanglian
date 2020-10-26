// pages/decoration/percentageSet/percentageSet.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: [{
        tip: '分销直推佣金',
        list: [{
            title: '按面积设置',
            text: '按面积设置 如每平方：x元',
            key: 'disCommendArea',
            valueKey:'DisCommendArea',
            num: '0',
            value:''
          },
          {
            title: '按成交额比例设置',
            text: '按成交额比例设置 百分比例',
            key: 'disCommendRatio',
            valueKey:'DisCommendRatio',
            value:''
          }
        ]
      },
      {
        tip: '分销间推佣金',
        list: [{
            title: '按面积设置',
            text: '按面积设置 如每平方：x元',
            key: 'disInCommendArea',
            valueKey:'DisInCommendArea',
            num: '0',
            value:''
          },
          {
            title: '按成交额比例设置',
            text: '按成交额比例设置 百分比例',
            key: 'disInCommendRatio',
            valueKey:'DisInCommendRatio',
            value:''
          }
        ]
      },
      {
        tip: '客户开发佣金',
        list: [{
            title: '按面积设置',
            text: '按面积设置 如每平方：x元',
            key: 'customerDeveloperArea',
            valueKey:'CustomerDeveloperArea',
            num: '0',
            value:''
          },
          {
            title: '按成交额比例设置',
            text: '按成交额比例设置 百分比例',
            key: 'customerDeveloperRatio',
            valueKey:'CustomerDeveloperRatio',
            value:''
          }
        ]
      },
      {
        tip: '客户跟单佣金',
        list: [{
            title: '按面积设置',
            text: '按面积设置 如每平方：x元',
            key: 'customerManagerArea',
            valueKey:'CustomerManagerArea',
            num: '0',
            value:''
          },
          {
            title: '按成交额比例设置',
            text: '按成交额比例设置 百分比例',
            key: 'customerManagerRatio',
            valueKey:'CustomerManagerRatio',
            value:''
          }
        ]
      },
      {
        tip: '订单跟单佣金',
        list: [{
            title: '按面积设置',
            text: '按面积设置 如每平方：x元',
            key: 'orderManagerArea',
            valueKey:'OrderManagerArea',
            num: '0',
            value:''
          },
          {
            title: '按成交额比例设置',
            text: '按成交额比例设置 百分比例',
            key: 'orderManagerRatio',
            valueKey:'OrderManagerRatio',
            value:''
          }
        ]
      },
      {
        tip: '设计佣金',
        list: [{
            title: '按面积设置',
            text: '按面积设置 如每平方：x元',
            valueKey:'DesignArea',
            key: 'designArea',
            num: '0',
            value:''
          },
          {
            title: '按成交额比例设置',
            text: '按成交额比例设置 百分比例',
            valueKey:'DesignRatio',
            key: 'designRatio',
            value:''
          },
        ]
      },
    ],
    AreafromDataInit: {
      disCommendArea: 0,
      disInCommendArea: 0,
      customerDeveloperArea: 0,
      customerManagerArea: 0,
      orderManagerArea: 0,
      designArea: 0,
    },
    AreafromData: {
      disCommendArea: '',
      disInCommendArea: '',
      customerDeveloperArea: '',
      customerManagerArea: '',
      orderManagerArea: '',
      designArea: '',
    },
    CjfromDataInit: {
      disCommendRatio: 0,
      disInCommendRatio: 0,
      customerDeveloperRatio: 0,
      customerManagerRatio: 0,
      orderManagerRatio: 0,
      designRatio: 0
    },
    CjfromData: {
      disCommendRatio: '',
      disInCommendRatio: '',
      customerDeveloperRatio: '',
      customerManagerRatio: '',
      orderManagerRatio: '',
      designRatio: '',
    },
    commissionType: 0,
  
  },
  updateInput(e) {
    if (e.currentTarget.dataset.num == 0) {
      var AreafromData = JSON.parse(JSON.stringify(this.data.AreafromData))
      AreafromData[e.currentTarget.dataset.key] = e.detail.value
      this.setData({
        AreafromData
      })
    } else {
      var CjfromData = JSON.parse(JSON.stringify(this.data.CjfromData))
      CjfromData[e.currentTarget.dataset.key] = e.detail.value
      this.setData({
        CjfromData
      })
    }
  },
  changeCommissionType(e) { //更改佣金支付角色
    if (e.currentTarget.dataset.commissiontype == this.data.commissionType) return
    this.setData({
      commissionType: e.currentTarget.dataset.commissiontype,
    })

  },
  //点击了确定按钮
  sure() {
    var data = {}
    //按成交额
    if (this.data.commissionType) {
      var ipt = false
      //输入的成交额值
      var arr = Object.keys(this.data.CjfromData)
      for (let i in arr) {
        if (!this.data.CjfromData[arr[i]]) {
          ipt = true
          break;
        }
      }
      if (ipt) {
        wx.showToast({
          title: '请填写所有成交额的值',
          icon: 'none',
          mask: true
        })
        return
      }
      data.setType = 2
      data = Object.assign(data, this.data.AreafromDataInit, this.data.CjfromData)
    } else {
      var ipt = false
      //输入的按面积的值
      var arr = Object.keys(this.data.AreafromData)
      for (let i in arr) {
        if (!this.data.AreafromData[arr[i]]) {
          ipt = true
          break;
        }
      }
      if (ipt) {
        wx.showToast({
          title: '请填写所有按面积的值',
          icon: 'none',
          mask: true
        })
        return
      }
      data.setType = 1
      data = Object.assign(data, this.data.CjfromDataInit, this.data.AreafromData)
    }
    console.log(data)
    app.ajaxToken('/shop/setcommission/' + app.globalData.userData.ShopID, data, 'post').then(res => {
      if (res.status == 0) {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          mask: true
        })
        setTimeout(() => {
          this.updata()
        }, 1500);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '提成设置',
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
  updata() {
    app.ajaxToken('/shop/getcommissionset/' + app.globalData.userData.ShopID, '', 'get').then(res => {
      if (res.data) {
        var obj = res.data
        var content = this.data.content
        for(let  i in content){
          for(let f in content[i].list){
            content[i].list[f].value = obj[content[i].list[f].valueKey]
          }
        }
        this.setData({
          content
        })
        if(obj.SetType == 2){
          this.setData({
            commissionType:1
          })
        }
      }
    })
  },
  onShow: function () {
    this.updata()
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