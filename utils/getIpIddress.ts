import axios from 'axios'

const getIpAddress = async () => {
  try {
    const { data } = await axios('/api/getIpAddress')

    const { ip } = data
    return ip
  } catch (err) {
    return err
  }
}

export default getIpAddress
