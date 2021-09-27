import {
  request
}
from "../../request/index.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchList: []
  },
  TimeId: -1,
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  // 监听input
  handleInputChange(e) {
    const {
      value
    } = e.detail
    // console.log(value);

    /**
     * trim() 方法用于删除字符串的头尾空白符，空白符包括：空格、制表符 tab、换行符等其他空白符等。
     * trim() 方法不会改变原始字符串。
     * trim() 方法不适用于 null, undefined, Number 类型。
     */

    //  检验值的合法性 value.trim()=> 只有空格 为false
    if (!value.trim()) {
      return; //不合法
    }
    // 清除定时器  防抖 这里的input是实时监听,所以keyup触发几次就监听几次 都是会从上往下执行handleInputChange()函数  清除定时器 然后在重新计时 这样就能一直补发请求
    // 防抖 => 输入框 时间过后执行一次
    // 节流 => 上/下拉操作 至少一次
    clearTimeout(this.TimeId)
    this.TimeId = setTimeout(() => {
      // 发送请求
      this.getSearch(value)
    }, 2000)
  },

  // 发送请求
  async getSearch(query) {
    const res = await request({
      url: "/goods/qsearch",
      data: {
        query
      } // 相当于 query:{}
    })
    this.setData({
      searchList: res
    })
  }
})