export const stampToTime = (timestamp) => {
  if (!timestamp) return null
  timestamp = timestamp.toString().length == 13 ? timestamp : timestamp * 1000 // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var date = new Date(timestamp)
  var Y = date.getFullYear() + '-'
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  // var D = date.getDate() + ' '
  var D = (date.getDate() + 1 < 10 ? '0' + (date.getDate() + 1) : date.getDate() + 1) + ' '
  var h = date.getHours() + ':'
  var m = date.getMinutes() + ':'
  var s = date.getSeconds()
  return Y + M + D + h + m + s
}
export const exisets = (val, array) => {
  return new Promise((reslove, reject) => {
    if (typeof val == 'string') {
      if (!array.length) reslove(false)
      array.forEach(arr => {
        if (val == arr._id) {
          return reslove(true)
        }
      })
      return reslove(false)
    } else if (typeof val == 'object') {
      if (!array.length) reslove(false)
      val.forEach(v => {
        array.forEach(arr => {
          if (v == arr._id) {
            return reslove(true)
          }
        })
      })
      return reslove(false)
    } else {
      return reslove(false)
    }
  })
}
