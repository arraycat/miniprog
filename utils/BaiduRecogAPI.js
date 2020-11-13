let host = 'https://aip.baidubce.com'
// This access token will expires in 2018-09-24
let accessToken = '24.9dd71531ac176d0336e02176c404caf4.2592000.1607804136.282335-17873855'
let baseUrl = host + '/rest/2.0/image-classify/v2/advanced_general?access_token=' + accessToken

function requestCoinRecog(base64Img) {
  let dataParams = {
    image: base64Img,
    top_num: 3
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl,
      data: dataParams,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        if (res.data) {
          console.log(res.data)
          let resultList = _parseRecogResult(res.data)
          if (resultList) {
            resolve(resultList)
          } else {
            reject()
          }
        }
      },
      fail: reject
    })
  })
}

function _parseRecogResult(res) {
  var resultList = []
  if (res.result) {
    resultList = res.result
  }
  return resultList
}

function _genRecogAcsToken() {
  let baiId = 'https://bricechou.github.io'
  let baidSk = 'https://bricechou.github.io'
  let baiGenUrl = 'https://aip.baidubce.com/oauth/2.0/token'
  let headerParams = {
    'content-type': 'application/x-www-form-urlencoded'
  }
  let dataParams = {
    grant_type: 'client_credentials',
    client_id: baiId,
    client_secret: baidSk
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: baiGenUrl,
      data: dataParams,
      header: headerParams,
      method: 'POST',
      success: function (res) {
        resolve(res)
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}

module.exports = {
  request: requestCoinRecog
}