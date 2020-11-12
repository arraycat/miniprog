//index.js

Page({
  data: {
    update: '',
    basic:{},
    today:{},
    tomorrow:{},
    afterTomor:{},
    todyIcon:'../../image/weather/999.png',
    tomorrowIcon:'../../image/weather/999.png',
    afterTomorIcon:'../../image/weather/999.png'
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

  },
  onShow: function () {
    
  },
  myClick:function(){
    wx.switchTab({
      url: '../page2/page2',
    })
  },
  to2:function(){
    wx.navigateToMiniProgram({
      appId: 'wxbeb90f1d6c17059b',
      success(res) {
        // 打开成功
        console.info(res);
      },
      fail(res) {
        console.error(res);
      }
    })
  },
  toPage2:function(){
    wx.switchTab({
      url: '../page2/page2',
    })
  },
  toPage4:function(){
    wx.switchTab({
      url: '../page4/page4',
    })
  },
  to4:function(){
    wx.navigateTo({
      url: '../recruit/recruit',
    })
  },
  to5:function(){
    wx.navigateTo({
      url: '../history/history',
    })
  },
  toWeather:function(){
    wx.navigateTo({
      url: '../weather/weather',
    })
  },

})
