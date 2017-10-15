// pages/edit/edit.js
var ujs = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    subTitle: '每次呈递都携有余温',
    isLoading: false,
    avatar: '/images/avatar.jpg',

    // 描述长度
    despCurLen: 0,
    despMaxLen: 200,

    // 图片
    imgMaxLen: 5,
    imgPreList: [],

    // 表单数据
    initName: '彭杰',
    initPhone: '17600118311',
    initCoName: 'TigerWit',
    initPosition: 'Coder',
  },

  chageAvatar: function () {
    const _this = this
    wx.chooseImage({
      count: 1,
      sizeType: 'original',
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        _this.setData({
          avatar: tempFilePaths[0]
        })
      }
    })
  },

  despInput: function (e) {
    var despLen = e.detail.value.length
    this.setData({
      despCurLen: despLen
    })
  },

  // 保存按钮
  saveCard: function (e) {
    let cardInfo = e.detail.value
    let keys = Object.keys(cardInfo)
    let toSubmitInfo = {}
    let isOK = false
    const _this = this
    
    // 提示错误信息
    for (let key of keys) {
      let directive = key.split('-')
      let name = directive[0]
      let nameZh = directive[1]
      let required = directive[2] === 'required'
      if (!cardInfo[key] && required) {
        wx.showModal({
          content: '请填写' + nameZh,
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        });
        return {
          done: true,
          value: undefined
        }
      }
      else if (cardInfo[key]){
        isOK = true
        toSubmitInfo[name] = cardInfo[key]
      }
    }
    // 处理个性签名
    if (Object.keys(toSubmitInfo).length > 0 && isOK){
      if (toSubmitInfo.desp && toSubmitInfo.desp.length > this.data.despMaxLen) {
        wx.showModal({
          content: '您的个性签名超过限制啦！请简短些吧~',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        });
        return
      }
      console.log('提交名片信息', toSubmitInfo)
      ujs.http.post('', toSubmitInfo).then(function(){
        // 上传图片
        wx.uploadFile({
          url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
          filePath: _this.data.imgPreList,
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            var data = res.data
            //do something
          }
        })
      })
    }
  },

  chooseImage: function () {
    const _this = this
    wx.chooseImage({
      count: this.data.imgMaxLen,
      sizeType: 'original',
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        _this.setData({
          imgPreList: [..._this.data.imgPreList, ...tempFilePaths].slice(0, _this.data.imgMaxLen)
        })
        console.log(tempFilePaths)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.initNewCard == 1){
      this.setData({
        title: '创建我的第一张轻名片'
      })
    } else {
      // 
      this.setData({
        title: '每次修改背后都隐藏追求完美的品质'
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})