//app.js
App({
  onLaunch: function () {
    var that = this
    wx.getStorage({ //获取缓存用户数据
      key: 'userData',
      success: function (res) {
        that.setGlobalData({
          userData: res.data
        })
        var userToken = {
          userName: 'decoration',
          password: 'decoration'
        }
        that.ajaxToken('/account/gettoken', userToken, 'post').then(ress => {
          that.globalData.Authorization = `${ress.data.type+' '+ress.data.token}`
          that.setUserInfo(res.data.UserID, () => {
            console.log('获取缓存,刷新toekn,自动登录成功')
          })
          that.initCategoryList()
        })
      }
    })
  },
  pay(data) { //支付，并更新用户数据
    var that = this
    wx.requestPayment({
      nonceStr: data.nonceStr,
      package: data.package,
      paySign: data.paySign,
      signType: data.signType,
      timeStamp: data.timeStamp,
      success(res) {
        that.setUserInfo(that.globalData.userData.UserID, () => {
          wx.showToast({
            title: '支付成功',
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 2,
            })
          }, 1000)
        })
      },
      fail(res) {
        wx.showToast({
          title: '支付失败',
          icon: 'none'
        })
      }
    })
  },
  initCategoryList(){
    this.ajaxToken('/common/getcategoryjson', 'get').then(res => {
      this.globalData.categoryList = JSON.parse(res.data)
    })
  },
  changeDateFormat(val) {
    if (val != null) {
        var datetime = new Date(val);
        var year = datetime.getFullYear();
        var month = datetime.getMonth() + 1;
        var date = datetime.getDate();
        var hour = datetime.getHours();
        var minutes = datetime.getMinutes();
        var second = datetime.getSeconds();
        if (month < 10) {
            month = "0" + month;
        }
        if (date < 10) {
            date = "0" + date;
        }
        if (hour < 10) {
            hour = "0" + hour;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (second < 10) {
            second = "0" + second;
        }
        var time = year + "年" + month + "月" + date + '日';
        console.log(time)
        return time;
    }
    return "";
},
  getStaffList(returnRes){//获取员工列表，添加店主
    var data={
      page:1,
      pagesize:50,
      state:2
    }
    this.ajaxToken('/shop/getstafflist/'+this.globalData.userData.ShopID,data,'get').then(res=>{
      res.data.push({
        StaffID : this.globalData.userData.UserID,
        UserID :  this.globalData.userData.UserID,
        ParentID : 0,
        ParentName: '店主',
        Identity : '',
        IdentityName : '店主',
        Grade : 5,
        Avatar : this.globalData.userData.Avatar,
        Mobile : this.globalData.userData.Mobile,
        Days : '无限',
        RealName : '店主',
        NickName : '店主',
      })
      returnRes(res.data)
    })
  },
  setUserInfo(UserID, success) { //保存用户数据
    var that = this
    this.ajaxToken('/account/getuserinfo', {
      userId: UserID
    }, 'get', ).then(res => {
      that.setGlobalData({
        userData: res.data
      })
      wx.setStorage({
        data: res.data,
        key: 'userData',
      })
      var changeTypeList = JSON.parse(JSON.stringify(that.globalData.nowUserType))
      for (let i in that.globalData.userTypeList) {
        if ((res.data.UserType & that.globalData.userTypeList[i].userTypeId) == that.globalData.userTypeList[i].userTypeId) {
          console.log(that.globalData.userTypeList[i].typeName)
          changeTypeList[that.globalData.userTypeList[i].typeKey] = true
          changeTypeList.nowUserText = that.globalData.userTypeList[i].typeName
        }
      }
      that.setGlobalData({
        nowUserType: changeTypeList
      })
      success()
    })
  },
  goUrl(url) { //封装跳转，验证登录，传输监听数据
    if (!this.globalData.userData.NickName) {
      console.log('未登录')
      url = '/pages/ordinary/registered/registered'
    }
    wx.navigateTo({
      url: url,
      // events: {
      //   // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
      //   someEvent: function(data) {
      //     console.log(data)
      //   }
      // },
      // success: function(res) {
      //   // 通过eventChannel向被打开页面传送数据
      //   res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
      // }
    })
  },
  watchCallBack: {},
  watchingKeys: [],
  setGlobalData(data) { //更改全局变量
    Object.keys(data).map(key => {
      var oldGlobalData = JSON.parse(JSON.stringify(this.globalData[key])) //old值
      var newGlobalData = Object.assign(oldGlobalData, data[key])
      this.globalData[key] = newGlobalData
    })
    // console.log('mutation', data);
    // wx.setStorageSync('store', this.globalData)// 加入缓存
  },
  $watch(key, cb) { //监听globalData
    this.watchCallBack = Object.assign({}, this.watchCallBack, {
      [key]: this.watchCallBack[key] || []
    });
    this.watchCallBack[key].push(cb);
    if (!this.watchingKeys.find(x => x === key)) {
      const that = this;
      this.watchingKeys.push(key);
      let val = this.globalData[key];
      Object.defineProperty(this.globalData, key, {
        configurable: true,
        enumerable: true,
        set(value) {
          const old = that.globalData[key];
          val = value;
          that.watchCallBack[key].map(func => func(value, old));
        },
        get() {
          return val
        }
      })
    }
  },
  ajaxToken(url, data, type) { //promise简易封装预请求
    var that = this;
    return new Promise(function (resolve, reject) {
      wx.request({
        url: that.globalData.httpUrl + url,
        data: data,
        method: type,
        header: {
          "Content-Type": "application/json;charset=UTF-8",
          "Authorization": that.globalData.Authorization
        },
        success: function (res) {
          if (res.data.status == 0) {
            resolve(res.data);
          } else {
            wx.hideLoading()
            wx.showToast({
              icon: 'none',
              title: res.data.msg,
            })
            return
          }
        },
        fail: function (res) {
          wx.hideLoading()
          // wx.showToast({
          //   icon: 'none',
          //   title: JSON.stringify(res),
          // })
          reject(res);
        },
      })
    });
  },
  globalData: {
    Authorization: '', //通用令牌
    httpUrl: 'https://api.dlkj369.com/api/v1.0',
    userData: {},
    cropperImg: '',
    nowUserType: {
      type1: true, //普通会员
      type2: false, //装企店主
      type3: false, //材料商店主
      type4: false, //装企员工
      type5: false, //材料商员工
      type6: false, //服务经理
      type7: false, //装企分销员
    },
    userTypeList: [ //用户类型数据
      {
        userTypeId: 1,
        typeName: '普通会员',
        typeKey: 'type1'
      },
      {
        userTypeId: 2,
        typeName: '装企店主',
        typeKey: 'type2'
      },
      {
        userTypeId: 4,
        typeName: '材料商店主',
        typeKey: 'type3'
      },
      {
        userTypeId: 8,
        typeName: '装企员工',
        typeKey: 'type4'
      },
      {
        userTypeId: 16,
        typeName: '材料商员工',
        typeKey: 'type5'
      },
      {
        userTypeId: 32,
        typeName: '服务经理',
        typeKey: 'type6'
      },
      {
        userTypeId: 64,
        typeName: '装企分销员',
        typeKey: 'type7'
      },
    ],
    styleListData : null,
    renderingsContent : '',//效果图富文本
    Addresses : [],
    introductionBody : '',
    bannerData : [],
    cooperationData : {},
    staffList : [],//员工列表
    categoryList : [],//材料全部列表
    orderDetails:{},//订单详情汇报数据
  }
})
// userType:{
//   普通会员 : 1,
//   装企店主 : 2,
//   材料商店主 : 4,
//   装企员工 : 8,
//   材料商员工 : 16,
//   服务经理 : 32,
//   装企分销员 : 64,
// }