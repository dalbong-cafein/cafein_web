import CryptoJS from 'crypto-js'

interface SortedSet {
  [key: string]: string
}

const access_key: string | undefined = process.env.ACCESS_KEY
const secret_key: string | undefined = process.env.SECRET_KEY

const requestMethod = 'GET'
const hostName = 'https://geolocation.apigw.ntruss.com'
const requestUrl = '/geolocation/v2/geoLocation'

const timeStamp = Math.floor(+new Date()).toString()

const sortedSet: SortedSet = {}
sortedSet['ip'] = 'IP_ADDRESSS'
sortedSet['ext'] = 't'
sortedSet['responseFormatType'] = 'json'

let queryString = Object.keys(sortedSet).reduce((prev, curr) => {
  return prev + curr + '=' + sortedSet[curr] + '&'
}, '')

queryString = queryString.substr(0, queryString.length - 1)

const baseString = requestUrl + '?' + queryString
const signature = makeSignature(
  secret_key,
  requestMethod,
  baseString,
  timeStamp,
  access_key
)

const config = {
  headers: {
    'x-ncp-apigw-timestamp': timeStamp,
    'x-ncp-iam-access-key': access_key,
    'x-ncp-apigw-signature-v2': signature
  }
}

const requestHeaders: HeadersInit = new Headers()
requestHeaders.set('x-ncp-apigw-timestamp', timeStamp)
requestHeaders.set('x-ncp-iam-access-key', access_key)
requestHeaders.set('x-ncp-apigw-signature-v2', signature)

fetch(`${hostName}${baseString}`, config)
  .then((response) => {
    console.log(response.data)
  })
  .catch((error) => {
    console.log(error.response.data)
  })

function makeSignature(secretKey, method, baseString, timestamp, accessKey) {
  const space = ' '
  const newLine = '\n'
  let hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey)

  hmac.update(method)
  hmac.update(space)
  hmac.update(baseString)
  hmac.update(newLine)
  hmac.update(timestamp)
  hmac.update(newLine)
  hmac.update(accessKey)
  const hash = hmac.finalize()

  return hash.toString(CryptoJS.enc.Base64)
}
