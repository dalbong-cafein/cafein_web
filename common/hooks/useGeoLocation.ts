import CryptoJS from 'crypto-js'

interface SortedSet {
  [key: string]: string
}



const useGeolocation = () => {
  console.log(access_key, secret_key)
  if (secret_key !== undefined && access_key !== undefined) {
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

    const requestHeaders: HeadersInit = new Headers()
    requestHeaders.set('x-ncp-apigw-timestamp', timeStamp)
    requestHeaders.set('x-ncp-iam-access-key', access_key)
    requestHeaders.set('x-ncp-apigw-signature-v2', signature)

    fetch(`${hostName}${baseString}`, { headers: requestHeaders })
      .then((response) => {
        console.log(response)
        response.json()
      })
      .catch((error) => {
        console.log(error.response.data)
      })
  }
}

function makeSignature(
  secretKey: string,
  method: string,
  baseString: string,
  timestamp: string,
  accessKey: string
) {
  const space = ' '
  const newLine = '\n'
  const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey)

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

export default useGeolocation
