// pages/needs/needs.js
let cards = require('../../utils/card')
let util = require('../../utils/util.js')
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    need: cards.needs
  },

  makePhoneCall: function (e) {
    wx.makePhoneCall({
      phoneNumber: cards.card[0].phone + ''
    })
  },

  deleteNeed: function () {
    let _this = this
    util.tools.confirm({
      content: '您确认删除【' + _this.data.need.title + '】吗？'
    }, () => {
      util.http.post('/need/delete', {
        id: _this.data.need.id
      })
    })
  },
  previewImage: function (e) {
    console.log(e.currentTarget.id)
    wx.previewImage({
      current: e.currentTarget.id,
      urls: this.data.need.imgs
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options, this.data.need)

    wx.setNavigationBarTitle({
      title: util.needsMap[options.type]
    })

    util.http.get('/card/get_needs', {
      type: options.type
    }).then(data => {
      console.log(data)
    })
  }
})