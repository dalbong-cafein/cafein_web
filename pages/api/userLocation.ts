// interface SortedSet {
//   [key: string]: string
// }

// function getUserLocation() {
//   const access_key = process.env.ACCESS_KEY
//   const secret_key = process.env.SECRET_KEY

//   if (access_key && secret_key) {
//     console.log(access_key, secret_key)
//     const requestMethod = 'GET'
//     const hostName = 'https://geolocation.apigw.ntruss.com'
//     const requestUrl = '/geolocation/v2/geoLocation'

//     const timeStamp = Math.floor(+new Date()).toString()

//     const sortedSet: SortedSet = {}
//     sortedSet['ip'] = 'IP_ADDRESSS'
//     sortedSet['ext'] = 't'
//     sortedSet['responseFormatType'] = 'json'

//     let queryString = Object.keys(sortedSet).reduce((prev, curr) => {
//       return prev + curr + '=' + sortedSet[curr] + '&'
//     }, '')

//     queryString = queryString.substr(0, queryString.length - 1)

//     const baseString = requestUrl + '?' + queryString

//     const signature = makeSignature(
//       secret_key,
//       requestMethod,
//       baseString,
//       timeStamp,
//       access_key
//     )

//     const requestHeaders: HeadersInit = new Headers()
//     requestHeaders.set('x-ncp-apigw-timestamp', timeStamp)
//     requestHeaders.set('x-ncp-iam-access-key', access_key)
//     requestHeaders.set('x-ncp-apigw-signature-v2', signature)

//     fetch(`${hostName}${baseString}`, { headers: requestHeaders })
//       .then((response) => {
//         console.log(response)
//         response.json()
//       })
//       .then((data) => console.log(data))
//       .catch((error) => {
//         console.log(error.response.data)
//       })
//   }
// }

// function makeSignature(
//   secretKey: string,
//   method: string,
//   baseString: string,
//   timestamp: string,
//   accessKey: string
// ) {
//   const space = ' '
//   const newLine = '\n'
//   const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey)

//   hmac.update(method)
//   hmac.update(space)
//   hmac.update(baseString)
//   hmac.update(newLine)
//   hmac.update(timestamp)
//   hmac.update(newLine)
//   hmac.update(accessKey)
//   const hash = hmac.finalize()

//   return hash.toString(CryptoJS.enc.Base64)
// }
