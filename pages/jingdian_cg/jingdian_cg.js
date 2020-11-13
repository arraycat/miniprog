// pages/page2/page2.js
//对应呈贡校区
const app = getApp();
wx.cloud.init()
const db = wx.cloud.database()
var myItem = null;
const _ = db.command;
var that = null;
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
    this.getLocation();
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
  init() {
    //1. 从 forum 集合中查询所有文档 
    //2. 对查询的每一条文档，调用app.nowdate方法，对文档中的date字段进行转换，并setData更新  items字段
    db.collection('chenggong').get()
      .then(result => {
        console.log(result);
        let items = result.data.map(item => {
          item["景点简介"] = item["景点简介"].substring(0, 50) + "...";
          item.image1 = "cloud://zhang-0gv1nrm6234aa24a.7a68-zhang-0gv1nrm6234aa24a-1304009510/images/" + item.img1
          return item;
        })
        myItem = items
        that.setData({
          items: items
        })
        // wx.hideLoading();
        wx.hideNavigationBarLoading()
      })
  },
  onClick: function (e) {
    var content = e.currentTarget
    console.log(content.offsetTop)
    var a = content.offsetTop
    var index = Math.round(a / 388)
    console.log(index)
    app.globalData.page2Info = myItem[index]["景点名"]
    app.globalData.area = "chenggong"
    wx.setStorageSync('place', myItem[index]["景点名"])
    wx.setStorageSync('area', "chenggong")
    console.log(app.globalData.page2Info),
      wx.navigateTo({
        url: '../detail/detail'

      })
  },
  toDL: function () {
    wx.switchTab({
      url: '../jingdian/jingdian',
    })
  },
  getLocation: function () {
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        that.getWeatherInfo(latitude, longitude);
      }
    })
  },
  getWeatherInfo: function (latitude, longitude) {
    var _this = this;
    var key = 'ea3c75b9afaa4edba743b1a873298307'; //你自己的key
    //需要在微信公众号的设置-开发设置中配置服务器域名
    var url = 'https://free-api.heweather.com/s6/weather?key=' + key + '&location=' + longitude + ',' + latitude;
    wx.request({
      url: url,
      data: {},
      method: 'GET',
      success: function (res) {
        var daily_forecast_today = res.data.HeWeather6[0].daily_forecast[0]; //今天预报
        var daily_forecast_tomorrow = res.data.HeWeather6[0].daily_forecast[1]; //明天天预报
        var daily_forecast_afterTomor = res.data.HeWeather6[0].daily_forecast[2]; //后天预报
        var basic = res.data.HeWeather6[0].basic;
        var update = res.data.HeWeather6[0].update.loc; //更新时间
        _this.setData({
          update: update,
          basic: basic,
          today: daily_forecast_today,
          tomorrow: daily_forecast_tomorrow,
          afterTomor: daily_forecast_afterTomor,
          todyIcon: '../../image/weather/' + daily_forecast_today.cond_code_d + '.png', //在和风天气中下载天气的icon图标，根据cond_code_d显示相应的图标
          tomorrowIcon: '../../image/weather/' + daily_forecast_tomorrow.cond_code_d + '.png',
          afterTomorIcon: '../../image/weather/' + daily_forecast_afterTomor.cond_code_d + '.png'
        });
      }
    })
  },
  toWeather: function () {
    wx.navigateTo({
      url: '../weather/weather',
    })
  },
})