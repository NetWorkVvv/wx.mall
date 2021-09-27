// components/tabs/tabs.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    propTabs: {
      type: Array,
      value: []
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
    handleName(e) {
      // console.log(e);
      const {index} = e.currentTarget.dataset
      this.triggerEvent('emitTabsHandles', index)
    }
  }
})