const parse = (str = '') => {
  str = str.replace(/^\?/, '')
  let result = {}

  if (!str) {
    return result
  }

  const arr = str.split('&')
  const length = arr.length

  for (let i = 0; i < length; i++) {
    let [ key, value ] = arr[i].replace(/%20|\+/g, ' ').split('=')

    result[decodeURIComponent(key)] = value ? decodeURIComponent(value) : null
  }

  return result
}

const stringify = (obj = {}) => {
  let result = ''

  for (let prop in obj) {
    result += encodeURIComponent(prop)
    if (obj.hasOwnProperty(prop) && obj[prop]) {
      result += '=' + encodeURIComponent(obj[prop])
    }
    result += '&'
  }

  return result.slice(0, -1)
}

export default {
  parse,
  stringify
}