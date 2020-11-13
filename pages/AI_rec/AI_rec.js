// pages/page2/page2.js
var util = require('../../utils/util')
var api = require('../../utils/BaiduRecogAPI')
import ImageHandler from '../../utils/imageHandler'

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
    this.canvasId = 'imgCanvas'
    this.handler = new ImageHandler(this)
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
  scanPhoto: function (evt) {
    let that = this
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        util.showBusy('正在上传')
        that.setData({
          canvasHidden: false,
          tipHidden: true,
        })
        let filePath = res.tempFilePaths[0]
        that.handler.setImage(filePath)
          .then((res) => {
            return api.request(res)
          })
          .then((res) => {
            console.log(res)
            util.showSuccess('图片上传成功')
            let resultList = res

            console.log(resultList)

            that.setData({
              resPanelHidden: false,
              resultList: resultList
            })

            var outRes = ''
            resultList.forEach(element => {
              console.log(element.keyword)
              outRes += element.keyword + " "
            });

            util.showModal('识别结果', outRes)

          })
          .catch((e) => {
            console.log(e)
            util.showModal('上传失败', '无法识别')
          })
      },
      fail: function (e) {
        console.log(e)
      }
    })
  },
})