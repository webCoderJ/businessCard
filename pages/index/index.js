//index.js
//获取应用实例
const app = getApp()
let card = require('../../utils/card')
let util = require('../../utils/util')

Page({
  data: {
    card: false,
    isLoading: true,
    shared: false
  },
  onPullDownRefresh: function (e) {
    console.log(e)
    wx.stopPullDownRefresh()
  },
  // 创建名片
  createCard: function () {
    wx.navigateTo({
      url: '../edit/edit?initNewCard=1'
    })
  },
  editCard: function () {
    wx.navigateTo({
      url: '../edit/edit?initNewCard=0'
    })
  },
  onLoad: function (options) {
    console.log(options)
    console.log(this.data.isLoading)
    let ctx = this

    // 此flag判别当前页面是否为分享页面
    this.setData({
      shared: options.shared
    })
    
    util.loader.show(ctx)
    setTimeout(() => {
      util.loader.hide(ctx)
      ctx.setData({
        card: card.card[0]
      })
    }, 100)
    // util.http.get('/test', {}).then(function(){})
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  previewImage: function(e){
    console.log(e.currentTarget.id)
    wx.previewImage({
      current: e.currentTarget.id,
      urls: this.data.card.imgs
    })
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '这是' + this.data.card.name + '的名片，请惠存',
      path: '/pages/index/index?shared=1&id=' + this.data.card.id,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
