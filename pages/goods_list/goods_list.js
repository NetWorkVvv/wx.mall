import {
  request
} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
        id: 0,
        name: '综合',
        isActive: true
      },
      {
        id: 1,
        name: '销量',
        isActive: false
      }, {
        id: 2,
        name: '价格',
        isActive: false
      }
    ], //tabs数据
    goodsList: [], //页面请求的数据
  },
  // 全局保存默认参数 不放在data中是因为 微信小程序data 变量的改变有点那啥
  QueryParams: {
    query: '',
    cid: '',
    pagenum: 1, // 根据请求容量 把数据库总数据分成多少页 
    pagesize: 10
  },
  // 页面数 
  totalPages: 1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid
    this.getGoodsList()
  },

  // 异步请求-列表数据
  async getGoodsList() {
    try {
      const res = await request({
        url: "/goods/search",
        data: this.QueryParams
      })
      // 计算某cid的总数据条数
      const total = res.total
      // 计算总页数 ceil 取上 floor取下
      this.totalPages = Math.ceil(total / this.QueryParams.pagesize)
      this.setData({
        // 如果不解构 则变成二维数组 则在wxml页面多重循环 goodsList[[old-goodsList],[new-goodsList]]
        // 也可以通常 concat 拼接数组 不然会替换掉原来的 => this.data.goodsList.concat(res.data.message.goods)
        goodsList: [...this.data.goodsList, ...res.goods],

      })
      // console.log(...this.data.goodsList, ...res.data.message.goods);

      // 关闭下拉窗口 没有触发下拉的话 直接关闭也不会err
      wx.stopPullDownRefresh()

    } catch (err) {
      console.log("列表数据请求失败", err);
    }
  },

  // tabs的点击操作
  emitTabsHandle(e) {
    // console.log(e);
    const index = e.detail
    const newTab = [{
        id: 0,
        name: '综合',
        isActive: true
      },
      {
        id: 1,
        name: '销量',
        isActive: false
      }, {
        id: 2,
        name: '价格',
        isActive: false
      }
    ]
    // forEach 直接处理数组
    newTab.forEach((item, idx) => idx === index ? item.isActive = true : item.isActive = false)
    this.setData({
      tabs: newTab
    })

  },

  /**
   * 生命周期函数--页面上拉触发事件
   */
  onReachBottom() {
    // 判断有误下一页数据
    if (this.QueryParams.pagenum >= this.totalPages) {
      // showToast 显示一会自动隐藏 showModule 手动关闭
      wx.showToast({
        title: '到底啦!',
        icon: 'error',
        duration: 500
      })
    } else { // 花式打印("%c","color:red;")
      this.QueryParams.pagenum++;
      this.getGoodsList()
    }
  },

  /**
   * 生命周期函数--页面下拉触发事件
   */
  onPullDownRefresh() {
    // 下拉重置页面数据
    this.setData({
      goodsList: []
    })
    this.QueryParams.pagenum = 1
    this.getGoodsList()
  }

})