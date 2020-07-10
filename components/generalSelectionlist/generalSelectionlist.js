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
    index : 0
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
})
