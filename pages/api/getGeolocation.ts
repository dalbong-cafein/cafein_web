import axios from 'axios'
import { algo, enc } from 'crypto-js'
import { NextApiRequest, NextApiResponse } from 'next'

const access_key = process.env.ACCESS_KEY as string
const secret_key = process.env.SECRET_KEY as string
const requestMethod = 'GET'
const hostName = 'https://geolocation.apigw.ntruss.com'
const requestUrl = '/geolocation/v2/geoLocation'
const timeStamp = Math.floor(+new Date()).toString()

const makeSignature = (
  secretKey: string,
  method: string,
  baseString: string,
  timestamp: string,
  accessKey: string
) => {
  const space = ' '
  const newLine = '\n'
  const hmac = algo.HMAC.create(algo.SHA256, secretKey)
  hmac.update(method)
  hmac.update(space)
  hmac.update(baseString)
  hmac.update(newLine)
  hmac.update(timestamp)
  hmac.update(newLine)
  hmac.update(accessKey)
  const hash = hmac.finalize()

  return hash.toString(enc.Base64)
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { ip } = req.query
  const sortedSet = { ip, responseFormatType: 'json', ext: 't' }

  let queryString = Object.keys(sortedSet).reduce((prev, curr) => {
    return (
      prev + curr + '=' + sortedSet[curr as 'ip' | 'responseFormatType'] + '&'
    )
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

  console.log(timeStamp, access_key, signature, '뭐가 문제야 세이 섬띵')

  const config = {
    headers: {
      'x-ncp-apigw-timestamp': timeStamp,
      'x-ncp-iam-access-key': access_key,
      'x-ncp-apigw-signature-v2': signature
    }
  }

  axios
    .get(`${hostName}${baseString}`, config)
    .then((response) => {
      console.log(response.data)
      return response
    })
    .catch((error) => {
      console.log(error.response.data)
    })
}

export default handler
