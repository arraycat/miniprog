//index.js

Page({
  data: {

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

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
    wx.switchTab({
      url: '../page2/page2',
    })
  },
})
