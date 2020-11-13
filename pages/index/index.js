//index.js

Page({
  data: {
    
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

  },
  onShow: function () {

  },
  myClick: function () {
    wx.switchTab({
      url: '../jingdian/jingdian'
    })
  },
  toScan: function () {
    wx.navigateTo({
      url: '../AI_rec/AI_rec',
    })
    // wx.navigateToMiniProgram({
    //   appId: 'wxbeb90f1d6c17059b',
    //   success(res) {
    //     // 打开成功
    //     console.info(res);
    //   },
    //   fail(res) {
    //     console.error(res);
    //   }
    // })
  },
  toJingdian: function () {
    wx.switchTab({
      url: '../jingdian/jingdian',
    })
  },
  toCloudAlbum: function () {
    wx.switchTab({
      url: '../cloundAlbum/cloundAlbum',
    })
  },
  toRecruit: function () {
    wx.navigateTo({
      url: '../recruit/recruit',
    })
  },
  toHistory: function () {
    wx.navigateTo({
      url: '../history/history',
    })
  },
  toWeather: function () {
    wx.navigateTo({
      url: '../weather/weather',
    })
  },

})