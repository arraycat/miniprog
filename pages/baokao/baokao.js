// pages/col/col.js
const app = getApp();
wx.cloud.init()
const db = wx.cloud.database()

const _ = db.command;
var that = null;
var myItem = null;
var mydata = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: null,
    selectShow: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['河北', '陕西', '山西', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '海南', '四川', '贵州', '云南', '甘肃', '青海', "天津"], //下拉列表的数据
    index: 0 //选择的下拉列表下标

  },
  selectTap() {
    this.setData({
      selectShow: !this.data.selectShow
    })
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    this.setData({
      index: Index,
      selectShow: !this.data.selectShow,
    });
    console.log(Index)
    mydata = this.data.selectData[Index]
    this.init2();
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
  search: function (e) {
    console.log(this.data.name)
    this.init()
  },
  init() {
    //1. 从 forum 集合中查询所有文档 
    //2. 对查询的每一条文档，调用app.nowdate方法，对文档中的date字段进行转换，并setData更新  items字段
    db.collection('baokao2019').where({
        "省份": this.data.name
      }).get()
      .then(result => {
        console.log(result);
        let items = result.data.map(item => {
          return item;
        })
        myItem = items
        that.setData({
          items: items
        })
        wx.hideLoading();
        wx.hideNavigationBarLoading()
      })
  },
  input: function (e) {
    this.setData({
      name: e.detail.value
    });
  },
  init2() {
    //1. 从 forum 集合中查询所有文档 
    //2. 对查询的每一条文档，调用app.nowdate方法，对文档中的date字段进行转换，并setData更新  items字段
    db.collection('baokao2019').where({
        "省份": mydata
      }).get()
      .then(result => {
        console.log(mydata)
        console.log(result);
        let items = result.data.map(item => {
          return item;
        })
        myItem = items
        that.setData({
          items: items
        })
        wx.hideLoading();
        wx.hideNavigationBarLoading()
      })
  }
})