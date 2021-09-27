// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}, //用户信息
    collectNum: 0, //收藏店铺的数量
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 读取缓存中的数据
    const {
      userInfo
    } = wx.getStorageSync('token') || {}
    // console.log(userInfo);

    const collectNum = (wx.getStorageSync('collect') || []).length

    // 重置AppData数据
    this.setData({
      userInfo,
      collectNum
    })
  },
  makePhone() {
    wx.makePhoneCall({
      phoneNumber: '400-123-456',
    })
  }

})