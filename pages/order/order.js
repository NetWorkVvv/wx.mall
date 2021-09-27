import {
  request
} from "../../request/index.js"
import {
  formatDate
} from "../../utils/tools.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
        id: 0,
        name: '全部',
        isActive: true
      },
      {
        id: 1,
        name: '待付款',
        isActive: false
      }, {
        id: 2,
        name: '待发货',
        isActive: false
      }, {
        id: 3,
        name: '退货/退款',
        isActive: false
      }
    ], //tabs数据
    order: [], //订单数据
  },

  /**
   * 生命周期函数--监听页面打开 无法和onLoad一样直接获取 options 上的参数 需要通过页面栈的方式获得
   */
  onShow: function () {
    // 获取当前的小程序的页面栈 最大就是10个数组(10页)
    let pages = getCurrentPages()
    // 索引最大的就是当前页面 获取当前页面的数据
    let currentPage = pages[pages.length - 1];
    // 获取其url参数
    let {
      type
    } = currentPage.options
    // 根据 type 激活显示的页面内容 当type=1 => index=0
    this._changeTitleByIndex(type - 1)
    // 获取订单列表
    this._getOrderList(type)
  },

  // 根据组件传递的数据 更改tabs激活的内容
  emitTabsHandle(e) {
    const index = e.detail
    this._changeTitleByIndex(index)
    // 重新发送请求 type=1  => index=0
    this._getOrderList(index + 1)
  },

  // 获取列表订单
  async _getOrderList(type) {
    // 从缓存中获取token
    const {
      token
    } = wx.getStorageSync('token')
    // 判断缓存中有无token
    if (!token) { //空字符串为false
      // 如果没有就跳转到授权页面
      wx.navigateTo({
        url: '../auth/auth',
      })
      return; //终止代码的运行  如果 有token就不会进入这里
    }
    // 设置请求头
    const header = {
      Authorization: token
    }
    const res = await request({
      url: "/my/orders/all",
      data: {
        type
      },
      header
    })
    // 把时间戳转化为 时间格式
    res.orders.forEach(item => {
      // new Date()获取系统当前时间
      const date = new Date(item.create_time * 1000)
      item.create_time  = formatDate(date,'yyyy-MM-dd  hh:mm:ss')
      // console.log(item.create_time );
    })

    this.setData({
      order:res.orders
    })
  },

  // 根据标题索引值 激活选中
  _changeTitleByIndex(index) {
    const {
      tabs
    } = this.data
    tabs.forEach((item, idx) => idx === index ? item.isActive = true : item.isActive = false)
    this.setData({
      tabs
    })
  }
})