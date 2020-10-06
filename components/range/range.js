// components/range/range.js
var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    rangeshow: {
      type: Boolean,
      value: false
    }
  },
  lifetimes: {
    attached: function () {
      app.ajaxToken('/common/getareajson', '', 'get').then(res => {//获取价格列表
        var area = JSON.parse(res.data)
        this.setData({
          area
        })      
        this.getarea(0,0)
      })
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    multiArray: [],
    multiIndex: [0, 0, 0],
    name:'区域'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //getarea  省索引 市索引
    getarea(index, index2) {
      var area = this.data.area
      var arr = []
      for (let i in area) {
        arr.push(area[i].label)
      }
      var arr2 = []
      for (let i in area[index].children) {
        arr2.push(area[index].children[i].label)
      }
      var arr3 = []
      var nowarr = this.data.area[index].children[index2]
      //有第三级
      if (nowarr.children.length) {
        for (let i in nowarr.children) {
          arr3.push(nowarr.children[i].label)
        }
      } else {
        var obj = ''
        obj = nowarr.label
        arr3 = [obj]
      }
      var multiArray = []
      multiArray.push(arr, arr2, arr3)
      this.setData({
        multiArray
      })
    },
    bindMultiPickerChange: function (e) {
      var multiIndex =  this.data.multiIndex
      var multiArray = this.data.multiArray
      if(e.detail.column == 0){
        multiIndex[0] = e.detail.value
        multiIndex[1] = 0
        multiIndex[2] = 0
        this.getarea(multiIndex[0],0)
        this.setData({
          multiIndex
        })
      }
      if(e.detail.column == 1){
        multiIndex[1] = e.detail.value
        multiIndex[2] = 0
        this.getarea(multiIndex[0],multiIndex[1])
        this.setData({
          multiIndex
        })
      }
      if(e.detail.column == 2){
        multiIndex[2] = e.detail.value
      }
    },
    bindchange(e){
      this.setData({
        multiIndex:e.detail.value
      })
      var arr = this.data.area
      var index = this.data.multiIndex
      if(arr[index[0]].children[index[1]].children.length){
        var id = arr[index[0]].children[index[1]].children[index[2]].value
      }else{
        var id = arr[index[0]].children[index[1]].value
      }
      var namearr = this.data.multiArray
      // this.setData({
      //   name:namearr[0][index[0]] + namearr[1][index[1]] + namearr[2][index[2]]
      // })
      this.setData({
        name:namearr[2][index[2]]
      })
      var obj = {}
      obj.id = id
      obj.name = this.data.name
      this.triggerEvent('changearea',obj)
    },
  }
})