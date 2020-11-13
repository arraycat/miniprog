//app.js
App({
  onLaunch: function () {
    // 初始化云函数
    wx.cloud.init({
      env: 'zhang-0gv1nrm6234aa24a',
      traceUser: true
    })

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
    console.log(logs.length);

    if (logs.length > 1) {
      wx.switchTab({
        url: '../../pages/index/index',
      })
    } else {
      wx.redirectTo({
        url: '../../pages/splash/splash',
      })
    }

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          // 跳转登录页面让用户登录
          wx.navigateTo({
            url: 'pages/user/user',
          })
        }
      }
    })
  },
  //相册中的全局变量
  globalData: {
    hasUser: false, // 数据库中是否有用户
    hasUserInfo: false, // 小程序的userInfo是否有获取
    userInfo: null,
    checkResult: null,
    code: null,
    openId: null,
    flag: 0,
    nickName: '',
    allData: {
      albums: []
    },
    id: null
  }
})