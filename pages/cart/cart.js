// 导入
const {
  showModal,
  showToast
} = require('../../utils/asyncWx.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    cartList: [], //加入购物车商品信息
    allCheck: false, //全选属性
    allTotalPrice: 0, //总价格 
    allNum: 0, //总数量
  },

  /**
   * 生命周期函数--监听当前页面打开
   */
  // 因为页面频繁打开关闭所以使用onShow 更好
  onShow() {
    // 获取缓存中加入购物车的商品数据
    const cartList = wx.getStorageSync('cartsList') || []

    // 计算全选 总价格 总数量
    this._calcAllCarts(cartList)

  },

  // 单个商品数量
  async handleNumChange(e) {
    const {
      id,
      operation
    } = e.currentTarget.dataset
    // 获取购物车数据
    const {
      cartList
    } = this.data
    // 根据购物车数据 找到需要修改的商品 索引号 当在cartList 中找到 与 点击的商品id 相同时 返回 cartList 中的索引号
    const index = cartList.findIndex(item => item.goods_id === id)
    // 是否删除
    if (cartList[index].num === 1 && operation === -1) {
      // 弹窗提示 如果回调函数 success 不是箭头函数 则需要更改 this 的指向
      const res = await showModal({
        title: "提示",
        content: "数量最少为1,是否要删除?"
      })
      if (res.confirm) {
        cartList.splice(index, 1)
        this._calcAllCarts(cartList)
      }
    } else {
      // 根据返回的索引号 修改  operation 有 -1 / +1
      cartList[index].num += operation
      // 重置数据 并重新计算 总的
      this._calcAllCarts(cartList)
    }
  },

  // 单个商品复选框
  handleItemChange(e) {
    // 获取被操作的商品id
    const goods_id = e.currentTarget.dataset.id;
    // 获取购物车数组
    let {
      cartList
    } = this.data
    // console.log(this.data,cartList);
    // 找到被操作的商品对象 => array.findIndex(遍历数组并返回一个索引)
    let index = cartList.findIndex(item => item.goods_id === goods_id)
    // 选择状态取反
    cartList[index].checked = !cartList[index].checked;
    // 重新计算总价格 全选 总数量 并重置data 和 缓存的数据
    this._calcAllCarts(cartList)
  },

  // 商品全选
  handleItamAllChange(e) {
    // 获取data中数据
    let {
      cartList,
      allCheck
    } = this.data

    // 修改
    allCheck = !allCheck
    // 循环修改cartList数组 中的商品选中属性
    cartList.forEach(item => item.checked = allCheck)
    // 重置
    this.setData({
      allCheck,
      cartList
    })
    this._calcAllCarts(cartList)
  },

  // 商品付款信息 
  async handleAccount() {
    // 从data中取出数据
    const {
      allNum,
      addressInfo
    } = this.data
    // 判断购物车有没有 选购商品
    if (allNum === 0) {
      await showToast({
        title: '您还未选购商品',
        icon: 'none',
      })
      return; // 防止穿透  => 也可以直接用else
    }
    // 跳转到支付界面
    wx.navigateTo({
      url: '../pay/pay',
    })
  },

  // 计算 全选  总价格  总数量
  _calcAllCarts(cartList) {
    // 计算全选 方法有很多 D:\Program Files (x86)\资料\JavaScript\JS API扩展.md 数组有长度为true
    const check = cartList.length != 0 ? !cartList.find(item => item.checked === false) : false
    // 总价格 总数量 计算 也可以用filter().reduce() || forEach 遍历出数组的对象 并加以操作 

    let allTotalPrice = 0
    let allNum = 0
    cartList.forEach(item => {
      if (item.checked) {
        allTotalPrice += item.num * item.goods_price
        allNum += item.num
      }
    })
    // 把购物车数据重新设置会data和缓存中
    this.setData({
      cartList,
      allCheck: check,
      allTotalPrice,
      allNum
    })
    wx.setStorageSync('cartsList', cartList)
  }
})