// pages/page3/page3.js

Page({


  /**
   * 页面的初始数据
   */
  data: {
    imglist: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    this.setData({
      src: "../../image/flag.png"
    })
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
  toIndex: function (e) {
    wx.switchTab({
      url: '../index/index'
    })
    console.log(e)
  },
  myChooseImage() {
    var _this = this;
    wx.showActionSheet({
      itemList: ['拍照', '从相册选择'],
      success: (res) => {
        wx.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'],
          sourceType: res.tapIndex === 0 ? ['camera'] : ['album'],
          success: function (res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            var tempFilePaths = res.tempFilePaths
            //显示Toast
            wx.showToast({
              title: '正在上传...',
              icon: 'loading',
              mask: true,
              duration: 1000
            });
            _this.setData({
              imglist: _this.data.imglist.concat(tempFilePaths)
            })
          },
          fail: function (res) {
            console.log(res.errMsg)
          }
        })
      }
    })
  },
  previewImage: function (event) {
    var that = this;
    var src = event.currentTarget.dataset.src; //获取data-src
    var imglist = that.data.imglist; //获取data-list
    //图片预览
    wx.previewImage({
      current: src,
      urls: imglist
    })
  },
  imgOption: function (event) {
    var that = this;
    var src = event.currentTarget.dataset.src; //获取data-src
    var imglist = that.data.imglist; //获取data-list
    wx.showActionSheet({
      itemList: ['保存到手机', '保存到云相册', '删除临时文件'],
      success: (res) => {
        //保存到手机
        if (res.tapIndex === 0) {
          //获取相册授权
          wx.getSetting({
            success(res) {
              if (!res.authSetting['scope.writePhotosAlbum']) {
                wx.authorize({
                  scope: 'scope.writePhotosAlbum',
                  success() {
                    console.log('授权成功')
                  }
                })
              }
            }
          }),
          wx.saveImageToPhotosAlbum({
            filePath: imglist,
            success(res) {
              wx.showToast({
                title: '保存成功',
                icon: 'success',
                duration: 2000
              });
            },
            fail(res) {
              wx.showToast({
                title: '保存失败',
                icon: 'success',
                duration: 2000
              });
            }
          });
        };
        //保存到云相册
        if(res.tapIndex === 1){
          var filePath;
          filePath=imglist;
          wx.navigateTo({
            url: '../page4/page4'
          })
        };
        //删除临时文件
        if(res.tapIndex === 2){
            
        };
      }
    })
  },
  
})