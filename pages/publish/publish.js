// pages/publish/publish.js
let util = require('../../utils/util')
let needsEn = Object.entries(util.needsMap)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 图片
    imgMaxLen: 5,
    imgPreList: [],

    // 需求种类
    curType: {
      key: '',
      value: ''
    },

    title: '',
    desp: ''
  },

  showNeedsSelections: function () {
    let _this = this
    wx.showActionSheet({
      itemList: Object.values(util.needsMap),
      success: function (res) {
        if (!res.cancel) {
          console.log(res)
          console.log(needsEn[res.tapIndex])
          _this.setData({
            curType: {
              key: needsEn[res.tapIndex][1],
              value: needsEn[res.tapIndex][0]
            }
          })
        }
      }
    });
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
  previewImage: function (e) {
    console.log(e)
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.imgPreList // 需要预览的图片http链接列表
    })
  },
  deleteImage: function (e) {
    let _this = this
    console.log(e.currentTarget.id)
    console.log(this.data.imgPreList.filter(item => item != e.currentTarget.id))
    this.setData({
      imgPreList: _this.data.imgPreList.filter(item => item != e.currentTarget.id)
    })
  },

  // 保存按钮
  saveNeed: function (e) {
    console.log('e.detail.value', e.detail.value)
    const _this = this
    const data = this.data
    const detail = e.detail.value

    if (!detail.title){
      util.tools.showErr('请输入标题')
      return
    }
    if (!detail.desp){
      util.tools.showErr('请输入需求描述')
      return
    }
    // 提示错误信息
    util.http.post('/publish_needs', {
      type: data.curType.value,
      title: detail.title,
      desp: detail.desp
    }).then(function () {
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      curType: {
        key: util.needsMap[options.type],
        value: options.type
      }
    })
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