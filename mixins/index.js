import { $Toast, $Message } from '../components/base/index'
import { action, upload } from '../api/index'

let timer = null
const $tell = (e) => {
  console.log(e)
}
const $go = (e, type = 'navigateTo') => {
  let url
  if (e instanceof Object) {
    url = e.currentTarget.dataset.url
    type = e.currentTarget.dataset.type || 'navigateTo'
  } else {
    url = e
  }
  // if (pathing === true) {
  //   return false
  // }
  // pathing = true
  if (type === 'navigateBack') {
    return new Promise((resolve, reject) => {
      wx.navigateBack({
        delta: url || 1,
        success(res) {
          // pathing = false
          resolve(res)
        },
        fail(res) {
          reject(res)
          // pathing = false
        }
      })
    })
  } else {
    return new Promise((resolve, reject) => {
      wx[type]({
        url,
        success(res) {
          // pathing = false
          resolve(res)
        },
        fail(res) {
          reject(res)
          // pathing = false
        }
      })
    })
  }
}

const $back = (duration = 1000, delta = 1) => {
  clearTimeout(timer)
  return new Promise((resolve, reject) => {
    timer = setTimeout(() => {
      wx.navigateBack({
        delta,
        success(res) {
          resolve(res)
        },
        fail(res) {
          reject(res)
        }
      })
    }, duration)
  })
}

const $openLocation = (e) => {
  let pos = {}
  if (e['currentTarget'] && e['currentTarget'].dataset.location) {
    let location = e.currentTarget.dataset.location.split(',')
    console.log(location)
    pos['latitude'] = Number(location[0])
    pos['longitude'] = Number(location[1])
  } else {
    pos = e
  }
  wx.openLocation(pos)
}

const $preview = (current, urls = [], host = '') => {
  if (host) {
    wx.previewImage({
      current: host + current,
      urls: urls.map((img) => host + img)
    })
  } else {
    wx.previewImage({
      current: current,
      urls: urls
    })
  }
}

const $phone = (e) => {
  let phone = e
  if (typeof e === 'object') {
    phone = e.currentTarget.dataset.phone
  } else {
    phone = e
  }
  wx.makePhoneCall({
    phoneNumber: String(phone)
  })
}

const $collect = (e) => {
  let formId = e.detail.formId
  action(formId)
  let url = e.currentTarget.dataset.url
  if (url) {
    $go(url)
  }
}

function $input (e) {
  let value = e.detail.value !== undefined ? e.detail.value : e.detail
  let name = e.currentTarget.dataset.name
  if (e.detail.value !== undefined) {
    value = e.detail.value
    let transform = e.currentTarget.dataset.transform
    if (e.currentTarget.dataset.transform) {
      try {
        this.setData({
          [name]: value[transform]()
        })
        // console.log(this.data[name])
      } catch (e) {
        console.log('传入的transform方法不正确，不能进行转换')
      }
      return value[transform]()
    }
  } else {
    value = e.detail
  }
  this.setData({
    [name]: value
  })
}

module.exports = {
  $go,
  $Toast,
  $Message,
  $tell,
  $collect,
  $phone,
  $back,
  $upload: upload,
  $openLocation,
  $input
}