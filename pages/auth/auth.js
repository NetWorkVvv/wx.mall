const {
  login,
  getUserProfile
} = require('../../utils/asyncWx.js')

import {
  request
} from "../../request/index.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {},
  async getUserInfo() {
    try {
      // 获取用户信息
      const {
        encryptedData,
        rawData,
        iv,
        signature,
        userInfo
      } = await getUserProfile({
        desc: "用于支付授权"
      })
      // 获取小程序登录成功后的code
      const {
        code
      } = await login({
        timeout: 10000
      })
      // 把参数 存储在一个变量中
      const loginParams = {
        encryptedData,
        rawData,
        iv,
        signature,
        code
      }
      // 发送请求获取token
      const res = await request({
        url: "/users/wxlogin",
        data: loginParams,
        method: "post"
      })
      // 因为小程序 不是企业级账号 所以 无法获取有效的token
      // console.log(res); //null
      // 所以这里直接使用 给出的token 用作数据的模拟
      const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
      wx.setStorageSync('token', {
        token: token,
        userInfo: userInfo
      })
      wx.navigateBack({
        delta: 1,
      })
    } catch (err) {
      console.log(err, 'token获取失败');
    }
  }

})