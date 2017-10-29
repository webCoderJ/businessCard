// pages/hot/hot.js
let list = require('../../utils/card')
let util = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 'hot',
    cards: list.card,
    curNum: 0,
    remainNum: 0
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const typeMap = {
      upvote: "谁赞过我",
      hot: "谁看过我",
      save: "谁保存过我",
    }
    const _this = this
    console.log(options)
    // 页面标题
    wx.setNavigationBarTitle({
      title: typeMap[options.type]
    })
    // 获取数据
    util.http.get('/url', {
      type: options.type,
      size: 20,
      offset: _this.curNum * 20
    }).then(data => {
      _this.setData({
        curNum: _this.curNum++,
        remainNum: data.remainNum
      })
    })
  },
  lower: function () {
    wx.showNavigationBarLoading();
    var that = this;
    util.http.get().then(data => {
      // 重新渲染列表
    })
  }
})