import {
  request
} from "../../request/index"

Page({

  /** 
   * 页面的初始数据
   */
  data: {
    goodsDetailList: [],
    isCollect: false, //商品是否被收藏
  },
  GoodsInfo: {}, //全局数据
  /**
   * 生命周期函数--监听页面打开
   */
  onShow: function () {
    // 获取页面栈
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 1]
    const options = currentPage.options
    const {
      goods_id
    } = options
    this.getGoodsDetail(goods_id)
  },

  //异步请求-商品详细信息
  async getGoodsDetail(goods_id) {
    try {
      const res = await request({
        url: "/goods/detail",
        data: {
          goods_id
        }
      })
      // console.log(res);
      this.GoodsInfo = res
      // 获取缓存中的商品数组
      const collect = wx.getStorageSync('collect') || []
      // 判断商品是否存在缓存中 some 遍历数组 并且 只要有一个符合条件就会返回 因为是数组 在数组中找商品是否存在于收藏列表
      let isCollect = collect.some(item => this.GoodsInfo.goods_id === item.goods_id)
      this.setData({
        goodsDetailList: {
          goods_name: res.goods_name,
          goods_price: res.goods_price,
          pics: res.pics,
          // 兼容问题
          goods_introduce: res.goods_introduce.replace(/\.webp/g, '.jpg')
        },
        isCollect
      })
      // console.log(res);
    } catch (err) {
      console.log(err);
    }
  },

  // 大图预览
  viewBigImage(e) {
    //wx.previewImage(Object object) https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.previewImage.html

    const urls = this.GoodsInfo.pics.map(item => item.pics_mid)
    const current = e.currentTarget.dataset.url
    // console.log(urls);
    console.log(this.GoodsInfo);
    wx.previewImage({
      urls,
      current
    })
  },

  // j加入购物车
  joinCartsList() {
    // console.log('s');
    // 获取缓存中的数据 || 如果左边为空 则为假 用右边
    let carts = wx.getStorageSync('cartsList') || [];
    // 判断商品对象是否存在购物车中 indexOf 返回元素 findIndex返回索引
    let index = carts.findIndex(item => item.goods_id === this.GoodsInfo.goods_id);
    if (index === -1) {
      // 不存在
      this.GoodsInfo.num = 1 //添加一个{num:1}
      this.GoodsInfo.checked = true //选中状态
      carts.push(this.GoodsInfo)
    } else {
      // 存在 数量+1
      carts[index].num++;
    }
    // 把购物车重新添加回缓存 
    wx.setStorageSync('cartsList', carts)
    wx.showToast({
      title: '加入成功',
      icon: "success",
      //true 直接禁止手势 =>节流 立马执行 n秒后才能再次执行(单位时间n秒内，第一次触发函数并执行，以后 n秒内不管触发多少次，都不执行。直到下一个单)
      // 另外一种 => 防抖 延迟执行(到达规定的时间执行一次后重新计时) 
      mask: true
    })
  },

  // 商品收藏
  handleCollectList() {
    let isCollect = false
    // 获取缓存中的商品数组
    const collect = wx.getStorageSync('collect') || []
    // 判断商品是否存在缓存中 some 遍历数组 并且 只要有一个符合条件就会返回 因为是数组 在数组中找商品是否存在于收藏列表
    let index = collect.findIndex(item => this.GoodsInfo.goods_id === item.goods_id)
    if (index !== -1) {
      // 收藏过了 再按一次的话就是移除收藏
      collect.splice(index, 1)
      isCollect = false
    } else {
      collect.push(this.GoodsInfo)
      isCollect = true
    }
    // 放入本地缓存中
    wx.setStorageSync('collect', collect)
    // 重置数据
    this.setData({
      isCollect
    })
  },

  // 立即支付
  goToPayment(){

  }
})