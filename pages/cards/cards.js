// pages/cards/cards.js
let cards = require('../../utils/card')
let util = require('../../utils/util.js')
let app = getApp()
/**
 * README
 * 需要分页/懒加载
 * 需要返回剩余条数
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cards: cards.card
    // cards: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(cards)
  },
  lower: function() {
    wx.showNavigationBarLoading();
    var that = this;
    util.http.get().then(data => {
      // 重新渲染列表
    })
  }
})