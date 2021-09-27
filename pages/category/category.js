import {
  request
} from "../../request/index"
Page({
  data: {
    leftMenuList: [], //左侧菜单数据
    rightMenuList: [], //右侧菜单数据
    currentIndex: 0, //被点击的左侧菜单 默认数据
    scrollTop: 0, //右侧滚动条的默认位置
  },
  // 保存返回的数据 防止数据被销毁 放在data中存取太麻烦 且最后都是放在app.js中所以用this取
  categoryList: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 读取本地缓存数据 数据太大不应次次请求
    const localData = wx.getStorageSync("cache")
    if (!localData) {
      // 不存在数据 为真时 => !locationData 表示为空
      this.getCategoryList()
    } else {
      // 设置过期时间 过期重发请求 防止后台数据更新 页面数据未更新 单位ms
      if (Date.now() - localData.time > 300000) {
        this.getCategoryList() //重新发送请求
      } else {
        // 未过期使用旧数据
        this.categoryList = localData.data
        let leftMenuList = this.categoryList.map(item => item.cat_name)
        let rightMenuList = this.categoryList[0].children
        this.setData({
          leftMenuList,
          rightMenuList
        })
      }
    }
  },

  // 异步请求-分类数据 async await 如果 await未执行完成 则不会执行相关进程
  async getCategoryList() {
    try {
      const res = await request({
        url: "/categories"
      })
      // 保存返回的数据 防止数据被销毁
      this.categoryList = res
      // 把数据存入到本地存储中 
      // web存 => localStorageSync.setItem('key',value) 不管存入什么数据都默认调用toString(成字符串)
      // 小程序存 => wx.setStorageSync('key',value) 存什么数据就是什么数据
      wx.setStorageSync('cache', {
        time: Date.now,
        data: this.categoryList
      })
      //左侧菜单数据 map 返回一个处理过的新数组 
      let leftMenuList = this.categoryList.map(item => item.cat_name)
      // 右侧菜单数据 这里的设置默认数据categoryList[0]
      let rightMenuList = this.categoryList[0].children
      this.setData({
        leftMenuList,
        rightMenuList
      })
      // console.log(leftMenuList);
      // console.log(rightMenuList);
    } catch (err) {
      console.log("分类数据获取失败", err);
    }

  },

  // 左侧菜单点击事件
  handleLeftTap(e) {
    // 保存index
    const currentIndex = e.currentTarget.dataset.index

    // 通过左侧数据 获取右侧数据
    let rightMenuList = this.categoryList[currentIndex].children

    this.setData({
      currentIndex,
      rightMenuList,
      // 重新设定滚动条的位置
      scrollTop: 0
    })

  }
})