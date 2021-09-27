// 导入
import {
  request
} from "../../request/index.js"

const {
  showToast,
  requestPayment
} = require("../../utils/asyncWx.js")

Page({
  /**
   * 页面的初始数据
   */
  data: {
    addressInfo: {}, //收货地址信息
    cartList: [], //加入购物车商品信息
    allTotalPrice: 0, //总价格 
    allNum: 0, //总数量
  },

  /**
   * 生命周期函数--监听当前页面打开
   */
  // 因为页面频繁打开关闭所以使用onShow 更好
  onShow() {
    // 获取缓存中收货地址信息
    const addressInfo = wx.getStorageSync('addressInfo') || {}
    // 获取缓存中加入购物车的商品数据
    let cartList = wx.getStorageSync('cartsList') || []
    // 过滤后的cartList数组
    cartList = cartList.filter(item => item.checked === true)
    // 计算全选 总价格 总数量
    this._calcAllCarts(cartList)
    // 重置data中的数据
    this.setData({
      addressInfo,
    })

  },

  // 商品支付信息 
  async handlePayment() {
    try {

      // 判断有无收货地址
      if (!this.data.addressInfo.consignee) {
        await showToast({
          title: "请输入正确的收货地址",
          icon: "none"
        })
        return;
      }
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
      // 创建订单
      // 设置请求头
      const header = {
        Authorization: token
      }
      // 设置请求体
      const order_price = this.data.allTotalPrice
      const consignee_addr = this.data.addressInfo.address
      const cart = this.data.cartList
      // 后端只需要 goods_id goods_number goods_price 所以要处理一下选购数组
      let goods = []
      cart.forEach(item => goods.push({
        goods_id: item.goods_id,
        goods_number: item.num,
        goods_price: item.goods_price
      }))
      // 把请求体 => 请求参数 都整合在一起 方便调用
      const request_body = {
        order_price,
        consignee_addr,
        goods
      }
      // 发送请求 创建订单 获取订单号
      const {
        order_number
      } = await request({
        url: "/my/orders/create",
        data: request_body,
        method: "POST",
        header: header
      })
      // console.log({order_number }); // order_number: "HMDD20210923000000033909"
      // 发起支付请求 使之返回 微信支付API 所需要的参数
      const {
        pay
      } = await request({
        url: "/my/orders/req_unifiedorder",
        data: {
          order_number
        },
        method: "POST",
        header: header
      })
      // console.log(pay);
      // 使用微信支付API https://developers.weixin.qq.com/miniprogram/dev/api/payment/wx.requestPayment.html

      // await requestPayment(pay) //  这里没有权限所以直接跳过 后台返回 支付成功 or 支付失败

      // toast 提示
      await showToast({
        title: "支付成功",
        icon: "none"
      })
      // 删除已经成功支付的商品 forEach 直接操作原数组
      let newCartList = wx.getStorageSync('cartsList')
      newCartList = newCartList.filter(item => item.checked === false)
      wx.setStorageSync('cartsList', newCartList)
      // 支付成功后跳转 
      wx.navigateTo({
        url: '../order/order?type=1',
      })



      // 订单查询
      const res = await request({
        url: '/my/orders/all',
        data: {
          order_number
        },
        method: "GET",
        header: header
      })


    } catch (error) {
      await showToast({
        title: "支付失败",
        icon: "none"
      })
      console.log(error);
    }
  },

  // 计算 总价格  总数量
  _calcAllCarts(cartList) {
    // 总价格 总数量 计算 也可以用filter().reduce() || forEach 遍历出数组的对象 并加以操作 
    let allTotalPrice = 0
    let allNum = 0
    cartList.forEach(item => {
      allTotalPrice += item.num * item.goods_price
      allNum += item.num
    })
    // 把购物车数据重新设置会data和缓存中
    this.setData({
      cartList,
      allTotalPrice,
      allNum
    })
  }
})