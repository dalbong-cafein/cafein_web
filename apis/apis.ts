import axios from 'axios'

export const fetchIStores = (location: string) => {
  return axios
    .get(`/api/web/stores?keyword=${encodeURI(location)}`)
    .then((res) => {
      return res.data.data
    })
}

export const fetchSggIStores = (url: string) => {
  return axios.get(`/api/web/stores/contents?${url}`).then((res) => {
    return res.data.data
  })
}

export const fetchCafeInfo = (url: string) => {
  return axios.get(`/api/${url}`).then((res) => {
    return res.data.data
  })
}
export const fetchCafeStarPoint = (url: string) => {
  return axios.get(`/api/stores/${url}`).then((res) => {
    return res.data.data
  })
}

export const fetchCafeNears = (url: string) => {
  return axios.get(`/api/web/stores/${url}`).then((res) => {
    return res.data.data
  })
}

export const fetchIp = (url: string) => {
  return axios
    .get('https://api64.ipify.org?format=json')
    .then((resp) => resp.data)
    .catch((err) => {
      return err
    })
}
