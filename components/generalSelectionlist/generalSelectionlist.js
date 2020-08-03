// components/generalSelectionlist/generalSelectionlist.js
Component({
  /**
   * 组件的属性列表
   */
  options:{
    multipleSlots : true
  },
  properties: {
    textList: {
      type: Array,
      value: [],
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    heightMax : '',
    textListIndex : 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeIndex(e){
      this.setData({
        textListIndex : e.currentTarget.dataset.index
      })
      this.triggerEvent('getList', {index:e.currentTarget.dataset.index})
    }
  },
})