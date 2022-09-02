import axios from 'axios'

export const fetchIStores = (location: string) => {
  return axios
    .get(`/api/web/stores?keyword=${encodeURI(location)}`)
    .then((res) => {
      return res.data.data
    })
}

export const fetchSggIStores = ({
  sggNm,
  type
}: {
  sggNm: string
  type: string
}) => {
  return axios
    .get(
      `/api/web/stores/contents?sggNm=${encodeURI(
        sggNm as string
      )}&type=${encodeURI(type as string)}`
    )
    .then((res) => {
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
