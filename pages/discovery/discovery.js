let cards = require('../../utils/card')
let util = require('../../utils/util')
let needsEn = Object.entries(util.needsMap)
Page({
  data: {
    addAnimation: false,

    // search
    inputShowed: false,
    inputVal: "",

    // swiper
    tabs: Object.values(util.needsMap),
    showtab: 0,
    card: cards.card[0],

    // 需求列表
    coList: [...cards.needs.co, ...cards.needs.co],
    buyList: cards.needs.buy,

    windowHeight: 0,
    windowWidth: 0
  },
  showNeedsSelections: function(){
    wx.showActionSheet({
      itemList: Object.values(util.needsMap),
      success: function (res) {
        if (!res.cancel) {
          console.log(res)
          console.log(needsEn[res.tapIndex][0])
          wx.navigateTo({
            url: '/pages/publish/publish?type=' + needsEn[res.tapIndex][0],
          })
        }
      }
    });
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  onLoad: function () {
    this.setData({
      addAnimation: true
    })

    console.log(util.needsMap)
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
        let sliderWidth = res.windowWidth / that.data.tabs.length
        console.log(res)
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex,
          sliderWidth: sliderWidth + 'px'
        });
      }
    });
  },

  // swiper
  togglepage: function (e){
    console.log(e)
    this.setData({
      showtab: e.detail.current
    })
  },
  setTab: function (e){
    console.log(e.currentTarget.dataset.tabindex)
    this.setData({
      showtab: e.currentTarget.dataset.tabindex
    })
  },
  previewImage: function (e) {
    console.log(e.currentTarget.id)
    wx.previewImage({
      current: e.currentTarget.id,
      urls: this.data.card.imgs
    })
  },
  // 点赞
  upvote: function(e){
    this.setData({})
    util.http.post('needs/upvote', {
      type: '1'
    })
  },
  // 取消点赞
  disUpvote: function (e) {
    util.http.post('needs/upvote', {
      type: '0'
    })
  }
});