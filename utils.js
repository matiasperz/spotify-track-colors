const url = require('url')

const formUrlEncodedBody = (params) => {
  var formBody = []

  for (var property in params) {
    var encodedKey = encodeURIComponent(property)
    var encodedValue = encodeURIComponent(params[property])
    formBody.push(encodedKey + "=" + encodedValue)
  }

  formBody = formBody.join("&")

  return formBody
}

const toBase64 = (s) => (Buffer.from(s).toString("base64"))

const getQueryFromUrl = (reqUrl) => url.parse(reqUrl, true).query

module.exports = {
  formUrlEncodedBody,
  toBase64,
  getQueryFromUrl,
}
