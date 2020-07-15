//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  goUrl:function(url){
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
  setGlobalData(data){//更改全局变量
    Object.keys(data).map(key => {
      var oldGlobalData =  JSON.parse(JSON.stringify(this.globalData[key])) //old值
      var newGlobalData  = Object.assign(oldGlobalData,data[key])
       this.globalData[key] = newGlobalData
    })
    // console.log('mutation', data);
    // wx.setStorageSync('store', this.globalData)// 加入缓存
  },
  
  $watch(key, cb){//监听globalData
    this.watchCallBack = Object.assign({}, this.watchCallBack,{
      [key]: this.watchCallBack[key] || []
    });
    this.watchCallBack[key].push(cb);
    if(!this.watchingKeys.find(x => x === key)){
      const that = this;
      this.watchingKeys.push(key);
      let val = this.globalData[key];
      Object.defineProperty(this.globalData, key, {
        configurable: true,
        enumerable: true,
        set(value){
          const old = that.globalData[key];
          val = value;
          that.watchCallBack[key].map(func => func(value, old));
        },
        get(){
          return val
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    userData:{
      platform : true
    }
  }
})