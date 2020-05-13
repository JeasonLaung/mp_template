export const fuckPage = (o) => {
  return new Promise((resolve, reject) => {
    let pages = getCurrentPages()
    if (typeof o  === 'number') {
      if (pages[pages.length - 1 - o]) {
        return resolve(pages[pages.length - 1 - o])
      } else {
        return reject(new Error('has not this page'))
      }
    } else if (typeof o === 'string') {
      for (let i in pages) {
        if (pages[i].route === o && pages[i]) {
          return resolve({page: pages[i], delta: pages.length - i - 1})
        }
      }
      reject(new Error(`has not page name is '${o}'`))
    } else {
      reject(new Error('param is not a legal value'))
    }
  })
}


// 时间格式化
export const date = (str, fmt = 'yyyy-MM-dd hh:mm:ss') => {
  if (!(str instanceof Date)) {
    str = new Date(str)
  }
  var o = {
    'M+': str.getMonth() + 1, // 月份
    'd+': str.getDate(), // 日
    'h+': str.getHours(), // 小时
    'm+': str.getMinutes(), // 分
    's+': str.getSeconds(), // 秒
    'q+': Math.floor((str.getMonth() + 3) / 3), // 季度
    'S': str.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (str.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }
  return fmt
}

// promise工厂
export const promisify = original => {
  return function (opt) {
    return new Promise((resolve, reject) => {
      opt = Object.assign({
        success: resolve,
        fail: reject
      }, opt)
      original(opt)
    })
  }
}

export const preFill = (str, num = 2, fill = '0') => {
  str = String(str)
  let dis = num - str.length
  let tmp = ''
  if (dis > 0) {
    for (let index = 0; index < dis; index++) {
      tmp += fill
    }
    tmp = tmp + str
  } else {
    tmp = str
  }
  return tmp
}

// json转url参数
export const json2url = (json) => {
  if (!json) {
    return ''
  }
  return Object.keys(json).map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
  }).join('&')
}

// json转url参数
export const url2Json = (url) => {
  let temp = {}
  url.replace(/([^?&]+)=([^?&]+)/g, (s, v, k) => {
    temp[v] = decodeURIComponent(k)
    return s
  })
  return temp
}
export const range = (begin, end, step = 1) => {
  let tmp = []
  if (end) {
    for (let i = begin; i < end;) {
      tmp.push(i)
      i += step
    }
  } else {
    for (let i = 0; i < begin;) {
      tmp.push(i)
      i += step
    }
  }
  return tmp
}
export const rrange = (begin, end, step = 1) => {
  let tmp = []
  if (end) {
    for (let i = end; i > begin;) {
      tmp.push(i)
      i -= step
    }
  } else {
    for (let i = begin; i > 0;) {
      tmp.push(i)
      i -= step
    }
  }
  return tmp
}
