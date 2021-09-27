export const request = (params) => {
  // 定义一个请求次数
  let req = 0;
  // 封装公共部分 方便后期维护
  wx.showLoading({
    title: '加载中',
    mask: true //添加蒙板 => 此时手势无用
  })


  const BaseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"

  // 异步请求-数据 在函数中 返回一个Promise
  return new Promise((resolve, reject) => {
    wx.request({
      // 解构 参数 
      ...params,
      // 把url参数单独拿出来
      url: BaseUrl + params.url,
      success(result) {
        resolve(result.data.message)
        req++;
      },
      fail(error) {
        reject(error)
      },
      // 接口调用结束的回调函数（调用成功、失败都会执行）
      complete() {
        //  同时发送多个请求时 如果还有接口数据 还没有返回 则也会关闭 showLoading 所以 要等全部数据返回 才关闭
        req--;
        if (req === 0) {
          // 关闭加载中
          wx.hideLoading()
        }
      }
    })
  })
}