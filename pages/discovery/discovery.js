let card = require('../../utils/card')
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
    showtab: 0
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
    this.setData({
      showtab: e.detail.current
    })
  },
  setTab: function (e){
    console.log(e.currentTarget.dataset.tabindex)
    this.setData({
      showtab: e.currentTarget.dataset.tabindex
    })
  }
});