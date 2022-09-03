import axios from 'axios'

const getIpAddress = async () => {
  try {
    const { data } = await axios('/api/getIpAddress')

    const { ip } = data
    console.log(ip, 'Call it from getIpAddress')
    return ip
  } catch (err) {
    console.log(err, 'getIpAddress의 에러다')
  }
}

export default getIpAddress
