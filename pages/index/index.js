// index.js
import {
  request
} from "../../request/index.js";

Page({
  data: {
    swiperList: [], //轮播图数据
    barList: [], //导航数据
    floorDataList: [], //楼层数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 异步请求数据
    this.getSwiperList();
    this.getBarList();
    this.getFloorDataList();

  },

  // 异步请求-轮播图数据
  async getSwiperList() {
    // request 是封装好的一个异步请求函数
    try {
      const res = await request({
        url: "/home/swiperdata"
      })
      this.setData({
        swiperList: res
      })
    } catch (err) {
      console.log("轮播图数据请求失败", err);
    }
  },

  // 异步请求-导航数据
 async getBarList() {
    try {
      const res = await request({
        url: "/home/catitems"
      })
      this.setData({
        barList: res
      })
    } catch (err) {
      console.log("导航数据请求失败", err);
    }
  },

  // 异步请求-楼层数据
 async getFloorDataList() {
    try {
      const res = await request({
        url: "/home/floordata"
      })
      this.setData({
        floorDataList: res
      })
    } catch (err) {
      console.log("楼层数据请求失败", err);
    }
  }
})