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

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
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
      item.image1 = "cloud://demo-2gj1gpqm7ece4fc4.6465-demo-2gj1gpqm7ece4fc4-1304009569/images/"+item.img1
      item.image2 = "cloud://demo-2gj1gpqm7ece4fc4.6465-demo-2gj1gpqm7ece4fc4-1304009569/images/"+item.img2
      item.image3 = "cloud://demo-2gj1gpqm7ece4fc4.6465-demo-2gj1gpqm7ece4fc4-1304009569/images/"+item.img3
      item.image4 = "cloud://demo-2gj1gpqm7ece4fc4.6465-demo-2gj1gpqm7ece4fc4-1304009569/images/"+item.img4
      item.image5 = "cloud://demo-2gj1gpqm7ece4fc4.6465-demo-2gj1gpqm7ece4fc4-1304009569/images/"+item.img5
      return item;
    })
    myItem = items
    that.setData({
      items:items
    })
    wx.hideLoading();
    wx.hideNavigationBarLoading()
  })
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
  }
})