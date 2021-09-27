// 弹窗封装
const showModal = (params) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: params.title,
      content: params.content,
      success: res => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

// 提示封装
const showToast = (params) => {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title: params.title,
      icon: params.icon,
      success: res => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

// 登录API
const login = (params) => {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout: params.timeout,
      success: res => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

// 请求用户信息封装
const getUserProfile = (params) => {
  return new Promise((resolve, reject) => {
    wx.getUserProfile({
      desc: params.desc,
      success: res => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

// 支付API 封装
const requestPayment = params => {
  return new Promise((resolve, reject) => {
    wx.requestPayment({
      ...params,
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}


module.exports = {
  showModal,
  showToast,
  login,
  getUserProfile,
  requestPayment
}