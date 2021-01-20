// pages/ordinary/components/searchHeader/searchHeader.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: '搜索',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    goUrl(e){
      app.goUrl(e.currentTarget.dataset.url)
    },
  }
})
