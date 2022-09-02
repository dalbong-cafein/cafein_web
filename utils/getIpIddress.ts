import axios from 'axios'

const getIpAddress = async () => {
  const { data } = await axios('/api/getIpAddress')
  const { ip } = data
  console.log(ip)
  return ip
}

export default getIpAddress
