// pages/needs/needs.js
let cards = require('../../utils/card')
let util = require('../../utils/util.js')
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    need: cards.card[0].needs.provideDetail
  },

  makePhoneCall: function (e) {
    wx.makePhoneCall({
      phoneNumber: cards.card[0].phone + ''
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  }
})