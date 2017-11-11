// pages/edit/edit.js
let ujs = require('../../utils/util.js')
let card = require('../../utils/card.js').card[0]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    subTitle: '宁 ‧ 静 ‧ 致 ‧ 远',
    isLoading: false,

    // 描述长度
    despCurLen: 0,
    despMaxLen: 140,

    // 图片
    imgMaxLen: 5,
    imgPreList: [],

    // 表单数据
    avatar: '',
    initName: '',
    initPhone: '',
    initCoName: '',
    initPosition: '',
    initEmail: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.initNewCard == 1) {
      this.setData({
        title: '创建我的第一张致名片',
      })
    } else {
      this.setData({
        title: '每次修改背后都隐藏追求完美的品质',
        avatar: card.avatar,
        initName: card.name,
        initPhone: card.phone,
        initCoName: card.co,
        initPosition: card.position,
        initEmail: card.email,
        imgPreList: card.imgs
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
  }
})