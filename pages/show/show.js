// pages/show/show.js
let cards = require('../../utils/card')
let util = require('../../utils/util.js')
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    card: cards.card[0]
  },
  // 保存
  saveCard: function () {
    util.http.post('/url/save').then(data => {

    })
  },
  makePhoneCall: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.number + ''
    })
  },
  previewImage: function (e) {
    console.log(e.currentTarget.dataset.url, [e.currentTarget.dataset.url])
    wx.previewImage({
      current: e.currentTarget.dataset.url,
      urls: [e.currentTarget.dataset.url]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  }
})