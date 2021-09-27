根目录下的文件夹
style 存放公共样式
components 存放组件
lib 存放第三方库
utils 存放自己的工具库
request 自己的接口

pages下的文件夹
首页  index
分类  category
商品列表  goods_list
商品详细  goods_detail
购物车  cart
收藏  collect
订单  order
搜索  searh
个人中心  user
意见反馈  feedback
登录页面  login
授权页面  auth
结束页面  pay

icon图标来自 https://www.iconfont.cn/

分类数据的 数据层级
message:[{
  "cat_id": 1,
  "cat_name": "大家电",
  "cat_pid": 0,
  "cat_level": 0,
  "cat_deleted": false,
  "cat_icon": "/full/none.jpg",
  "children": [{
    "cat_id": 3,
    "cat_name": "电视",
    "cat_pid": 1,
    "cat_level": 1,
    "cat_deleted": false,
    "cat_icon": "/full/none.jpg",
    "children": [{
      "cat_id": 5,
      "cat_name": "曲面电视",
      "cat_pid": 3,
      "cat_level": 2,
      "cat_deleted": false,
      "cat_icon": "https://api-hmugo-web.itheima.net/full/2fb113b32f7a2b161f5ee4096c319afedc3fd5a1.jpg"
    },
    {
      "cat_id": 6,
      "cat_name": "海信",
      "cat_pid": 3,
      "cat_level": 2,
      "cat_deleted": false,
      "cat_icon": "https://api-hmugo-web.itheima.net/full/5e38cf9e6e7c46a17fe1c597a883ae627977b296.jpg"
    }]
  }]
}]


carts\goods_list\goods_detail\address\addressList 值得注意