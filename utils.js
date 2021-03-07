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

module.exports = {
  formUrlEncodedBody,
  toBase64,
}
