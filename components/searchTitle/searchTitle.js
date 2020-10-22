// components/searchTitle/searchTitle.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    titleList: {
      type: Array,
      value: [],
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
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
    },
    updateInput(e) {
      this.triggerEvent('getList', {value:e.detail.value})
    },
    changeInput(e){},
  }
})
