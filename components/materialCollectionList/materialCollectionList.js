// components/materialCollectionList/materialCollectionList.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {},
    },
    type: {
      type: String,
      value: '',
    },
    ShopID: {
      type: String || Number,
      value: '',
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
    goUrl(e) {
      app.goUrl(e.currentTarget.dataset.url)
    },
  }
})
