import axios from 'axios'
import { algo, enc } from 'crypto-js'
import { NextApiRequest, NextApiResponse } from 'next'

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

type currType = 'ip' | 'responseFormatType' | 'ext'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const access_key = process.env.ACCESS_KEY as string
  const secret_key = process.env.SECRET_KEY as string
  const requestMethod = 'GET'
  const hostName = 'https://geolocation.apigw.ntruss.com'
  const requestUrl = '/geolocation/v2/geoLocation'
  const timeStamp = Math.floor(+new Date()).toString()
  const { ip } = req.query
  const sortedSet = { ip, responseFormatType: 'json', ext: 't' }

  let queryString = Object.keys(sortedSet).reduce((prev, curr) => {
    return prev + curr + '=' + sortedSet[curr as currType] + '&'
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

  try {
    const response = await axios.get(`${hostName}${baseString}`, config)
    return res.status(200).json({ data: response.data.geoLocation })
  } catch (err) {
    return res.status(500).json({ err })
  }
}

export default handler
