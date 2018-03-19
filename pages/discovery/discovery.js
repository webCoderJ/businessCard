let cards = require('../../utils/card')
let util = require('../../utils/util')
// let needsEn = Object.entries(util.needsMap)
Page({
  data: {
    addAnimation: false,

    // search
    inputShowed: false,
    inputVal: "",

    // swiper,导航条
    tabs: Object.values(util.needsMap),
    showtab: 0,
    card: cards.card[0],

    // navi数据由后台配置(假数据)
    navi: [
      {
        name_en: 'co',
        name_zh: '合作机会',
        // 剩余条数
        remian: 0,
        needs: [
          {
            imgs: [
              '/images/avatar.jpg',
              '/images/icon-hot.png',
              '/images/icon-job.png',
              '/images/icon-co.png',
              '/images/icon-provide.png'
            ],
            id: 0,
            // 是否为自己发布
            is_self: false,
            name: '向日狗',
            co: '鹏凌科技',
            position: 'CEOOO',
            avatar: '/images/avatar.jpg',
            hot: 20,
            upvote: 88,
            // 是否点过赞
            upvoted: 0,
            title: '本公司开发小程序，牛批得很！',
            desc: '本公司开发小程序，牛批得很！想做快点给老子打电话！！！Talk is cheap, show me the code!，本公司开发小程序，牛批得很！想做快点给老子打电话！！！Talk is cheap, show me the code!本公司开发小程序，牛批得很！想做快点给老子打电话！！！Talk is cheap, show me the code!本公司开发小程序，牛批得很！'
          }
        ]
      },
      {
        name_en: 'buy',
        name_zh: '采购计划',
        remian: 0,
        needs: [
          {
            imgs: [
              '/images/icon-focus.png',
            ],
            name: '戴二肥',
            co: '鹏凌科技',
            position: '首席架构',
            avatar: '/images/avatar.jpg',
            hot: 20,
            upvote: 88,
            upvoted: 1,
            title: '需要购买1024核CPU',
            desc: '本公司开发小程序，牛批得很！想做快点给老子打电话！！！Talk is cheap, show me the code!，本公司开发小程序，牛批得很！想做快点给老子打电话！！！Talk is cheap, show me the code!本公司开发小程序，牛批得很！想做快点给老子打电话！！！Talk is cheap, show me the code!本公司开发小程序，牛批得很！'
          }
        ]
      },
      {
        name_en: 'job',
        name_zh: '人才招聘',
        // 剩余条数
        remian: 20,
        needs: [
          {
            imgs: [
              '/images/icon-focus.png',
            ],
            name: '刘总',
            co: '鹏凌科技',
            position: '首席销售',
            avatar: '/images/avatar.jpg',
            hot: 20,
            upvote: 88,
            upvoted: 1,
            title: '需要招聘20个嫩模',
            desc: '本公司开发小程序，牛批得很！想做快点给老子打电话！！！Talk is cheap, show me the code!，本公司开发小程序，牛批得很！想做快点给老子打电话！！！Talk is cheap, show me the code!本公司开发小程序，牛批得很！想做快点给老子打电话！！！Talk is cheap, show me the code!本公司开发小程序，牛批得很！'
          }
        ]
      }
    ],

    // 需求列表
    coList: [...cards.needs.co, ...cards.needs.co],
    buyList: cards.needs.buy,

    windowHeight: 0,
    windowWidth: 0
  },
  // 加载更多
  upper: function (e) {
    console.log(e)
    let oldNavi = this.data.navi
    let index = e.currentTarget.dataset.index
    let type = e.currentTarget.dataset.type
    oldNavi[index].is_refresh = true
    console.log(oldNavi)
    this.setData({
      navi: oldNavi
    })
    // 效果模拟
    setTimeout(() => {
      oldNavi[index].is_refresh = false
      this.setData({
        navi: oldNavi
      })
    }, 1000)
    // util.http.get('/needs/', {
    //   type: type
    // }).then(res => {
    //   oldNavi[index].needs = res.data
    // })
  },
  lower: function(e){
    // todo - 跟upper一样
    console.log(e)
  },
  // 点赞
  upvote: function (e) {
    console.log(e)
    let oldNavi = this.data.navi
    let dataset = e.currentTarget.dataset
    console.log(dataset)
    oldNavi[dataset.navIndex].needs[dataset.index].upvoted = 1
    oldNavi[dataset.navIndex].needs[dataset.index].upvote += 1
    console.log(oldNavi[dataset.navIndex].needs[dataset.index], oldNavi)
    this.setData({
      navi: oldNavi
    })

    // util.http.post('needs/upvote', {
    //   type: '1',
    //   id: 'id'
    // })
  },
  // 取消点赞
  disUpvote: function (e) {
    util.http.post('needs/upvote', {
      type: '0'
    })
  },
  showNeedsSelections: function () {
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

    // 获取导航条数据
    // this.http.get('discovery/navi').then(function(){

    // })

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
  togglepage: function (e) {
    console.log(e)
    this.setData({
      showtab: e.detail.current
    })
  },
  setTab: function (e) {
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
  }
});