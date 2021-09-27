// pages/collect/collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
        id: 0,
        name: '商品收藏',
        isActive: true
      },
      {
        id: 1,
        name: '店铺收藏',
        isActive: false
      }, {
        id: 2,
        name: '关注商品',
        isActive: false
      }, {
        id: 3,
        name: '浏览足迹',
        isActive: false
      }
    ],
    collectList: [], //收藏商品列表
  },

  onShow: function () {
    // 从缓存中读书数据
    const collectList = wx.getStorageSync('collect') || []
    // 重置数据
    this.setData({
      collectList
    })
  },

  // 组件通信
  emitTabsHandle(e){
    const index = e.detail
    const {
      tabs
    } = this.data
    tabs.forEach((item, idx) => idx === index ? item.isActive = true : item.isActive = false)
    this.setData({ 
      tabs
    })
  }
})