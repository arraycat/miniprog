// pages/page2/page2.js
const app = getApp();
wx. cloud. init()
const db = wx.cloud.database()
const _ = db.command;
var that = null;
var myItem = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    this.towerSwiper('swiperList');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.showNavigationBarLoading();
    that.init();
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  init(){
    //1. 从 forum 集合中查询所有文档 
    //2. 对查询的每一条文档，调用app.nowdate方法，对文档中的date字段进行转换，并setData更新  items字段
    var place = wx.getStorageSync('place')
    var area = wx.getStorageSync('area')
  db.collection(area).where({
    "景点名":place
  }).get()
  .then(result=>{
    console.log(result);
    let items = result.data.map(item=>{
      item.image1 = "cloud://zhang-0gv1nrm6234aa24a.7a68-zhang-0gv1nrm6234aa24a-1304009510/images/"+item.img1
      item.image2 = "cloud://zhang-0gv1nrm6234aa24a.7a68-zhang-0gv1nrm6234aa24a-1304009510/images/"+item.img2
      item.image3 = "cloud://zhang-0gv1nrm6234aa24a.7a68-zhang-0gv1nrm6234aa24a-1304009510/images/"+item.img3
      item.image4 = "cloud://zhang-0gv1nrm6234aa24a.7a68-zhang-0gv1nrm6234aa24a-1304009510/images/"+item.img4
      item.image5 = "cloud://zhang-0gv1nrm6234aa24a.7a68-zhang-0gv1nrm6234aa24a-1304009510/images/"+item.img5
      return item;
    })
    myItem = items
    console.log(myItem)
    var mydata = myItem[0]
    console.log(mydata)
    console.log(this.data.swiperList[0].url)
    this.setData({
      'swiperList[0].url':mydata.image1,
      'swiperList[1].url':mydata.image2,
      'swiperList[2].url':mydata.image4,
      'swiperList[3].url':mydata.image3,
      'swiperList[4].url':mydata.image5,
      'swiperList[5].url':mydata.image1,
      'swiperList[6].url':mydata.image2,
    })
    that.setData({
      items:items
    })
    wx.hideLoading();
    wx.hideNavigationBarLoading()
  }
  )
  },
  nav:function(){
    console.log(myItem[0])
    var mydata = myItem[0]
    var position = mydata["位置"]
    console.log(mydata["位置"])
    wx.openLocation({
      latitude:position[0],	//维度
      longitude: position[1], //经度
      name: "目的地",	//目的地定位名称
      scale: 13,	//缩放比例
      address: "目的地"	//导航详细地址
    })
  },
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list,
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  }
})