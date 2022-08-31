import axios from 'axios'

export const fetchIStores = (url: string) => {
  return axios.get(`/api/web/stores?keyword=${encodeURI(url)}`).then((res) => {
    return res.data.data
  })
}
