//index.js
//获取应用实例
const app = getApp()
import card from '../../utils/card.js'

Page({
  data: {
    cardData: []
  },
  // 创建名片
  createCard: function() {
    wx.navigateTo({
      url: '../edit/edit?initNewCard=1'
    })
  },
  onLoad: function () {
    // this.setData({
    //   cardData: card.card
    // })
    wx.navigateTo({
      url: '../edit/edit?initNewCard=0'
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
