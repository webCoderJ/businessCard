const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}

// 需求配置
let needsMap = {
  chance: "合作机会",
  buy: "采购计划",
  job: "人才招聘",
  provide: "物资供应",
  provide2: "物资供应2",
}

module.exports.needsMap = needsMap

// 封装loading模块
let loader = {
  show: function (context) {
    wx.showLoading({
      title: '加载中',
    })
    wx.showNavigationBarLoading()
    if (context) {
      context.setData({
        isLoading: false
      })
    }
  },
  hide: function (context) {
    wx.hideLoading()
    wx.hideNavigationBarLoading()
    if (context) {
      context.setData({
        isLoading: false
      })
    }
  }
}

module.exports.loader = loader

function pull(url, method, params) {
  loader.show()
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: params,
      method: method,
      header: {
        //'Content-Type': 'application/json'
      },
      success: function (res) {
        loader.hide()
        console.log("success")
        resolve(res)
      },
      fail: function (res) {
        loader.hide()
        reject(res)
        console.log("failed")
      }
    })
  })
}
// 封装HTTP模块
module.exports.http = {
  get: function (url, params) {
    return pull(url, 'GET', params)
  },
  post: function (url, params) {
    return pull(url, 'POST', params)
  }
}

module.exports.http = {
  get: function (url, params) {
    return pull(url, 'GET', params)
  },
  post: function (url, params) {
    return pull(url, 'POST', params)
  }
}

module.exports.tools = {
  showErr: function(msg, callback){
    wx.showModal({
      content: msg,
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          callback && callback()
        }
      }
    });
  },
  confirm: function (params, confirm, cancel) {
    let options = Object.assign({
      title: '',
      content: '',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          confirm && confirm()
        } else {
          cancel && cancel()
        }
      }
    }, params)
    wx.showModal(options);
  },
} 
