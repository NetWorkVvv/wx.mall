Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var arr = wx.getStorageSync('addressList') || [];
    // console.info("缓存数据：" + arr);
    // 更新数据  
    this.setData({
      addressList: arr
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad();
  },
  addAddress: function () {
    wx.navigateTo({
      url: '../address/address'
    });
  },
  /* 删除item */
  delAddress: function (e) {
    const {
      addressList
    } = this.data

    const index = e.target.dataset.index
    addressList.splice(index, 1);
    // console.log(e.target.dataset.id);
    // 更新data数据对象  
    if (this.data.addressList.length > 0) {
      this.setData({
        addressList
      })
      wx.setStorageSync('addressList', addressList);
    } else {
      this.setData({
        addressList
      })
      wx.setStorageSync('addressList', []);
    }

  },

  chooseInfo(e) {
    // console.log(e);
    const id = e.currentTarget.dataset.id
    const {
      addressList
    } = this.data
    const arr = addressList[id]
    if (addressList[id]) {
      wx.setStorageSync('addressInfo', arr)
      wx.navigateBack({
        delta: 1,
      })
    } else {
      wx.setStorageSync('addressInfo', [])
    }


  }
})