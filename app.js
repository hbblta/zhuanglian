//app.js
App({
  onLaunch: function () {
    var that = this
    wx.getStorage({//获取缓存用户数据
      key: 'userData',
      success:function(res){
        that.setGlobalData({
          userData: res.data
        })
      }
    })
  },
  goUrl: function (url) { //封装跳转，验证登录，传输监听数据
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
  ajaxToken(url,data,type) {//promise简易封装预请求
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
          if(res.data.status == 0){
            resolve(res.data);
          }else{
            wx.showToast({
              icon:'none',
              title: `接口状态:${res.data.status},错误信息:${res.data.title}`,
            })
            return
          }
        },
        fail: function (res) {
          reject(res);
        },
      })
    });
  },
  globalData: {
    Authorization:'',//通用令牌
    httpUrl:'https://api.dlkj369.com/api/v1.0',
    userData: {
      // platform : true
    }
  }
})