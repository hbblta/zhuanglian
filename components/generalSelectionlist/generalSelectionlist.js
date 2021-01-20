// components/generalSelectionlist/generalSelectionlist.js
Component({
  /**
   * 组件的属性列表
   */
  options:{
    multipleSlots : true
  },
  properties: {
    textList: {//左侧渲染列表
      type: Array,
      value: [],
    },
    keyword:{//右侧搜索关键字
      type:String,
      value:''
    },
    listSearch:{//右侧搜索
      type:Boolean,
      value:true
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    heightMax : '',
    textListIndex : 0,
    load : false
  },

  /**
   * 组件的方法列表
   */
  created(){
  },
  methods: {
    changeIndex(e){
      this.setData({
        textListIndex : e.currentTarget.dataset.index
      })
      this.triggerEvent('getList', {index:e.currentTarget.dataset.index})
    },
    inputValue(e){
      this.triggerEvent('inputvalue',e.detail.value)
    },
    loadresh(){
      this.triggerEvent('getList',{type:'loadresh'})
      this.setData({
        load : false
      })
    },
    moreList(){
      this.triggerEvent('getList',{type:'more'})
      this.setData({
        load : false
      })
    }
  },
})
