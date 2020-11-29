// components/effectCollectionList/effectCollectionList.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {
        imgUrl : '',
        decorationName : '材料商名称',
        decorationAddress : '加载中',
        decorationPhone:'加载中'
      },
    },
    type: {
      type: Number,
      value: 1,
    },
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
    goMaterialList(e){
      app.ajaxToken('/store/geteffectmaterials/'+app.globalData.userData.ShopID+'/'+e.currentTarget.dataset.id,'', 'get').then(res => {
        var styleData = {
          materials : [],
          auxiliaryCost : res.data.auxiliaryCost
        }
        styleData.materials = [[],[],[],[],[]]
        res.data.Details[0].Items.forEach((item3,index3)=>{
          if(!item3.SpaceID){
            item3.selected = true
            styleData.materials[0].push(item3)
          }
        })
        app.globalData.styleListData = {
          styleData : {
            materials : styleData.materials,
            auxiliaryCost : res.data.AuxiliaryCost
          }
        }
        app.goUrl('/pages/decoration/effectPictureChecklist/effectPictureChecklist')
      })
    },
  }
})
