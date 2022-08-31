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

export const fetchCafeInfo = ({ storeId }: { storeId: string }) => {
  return axios.get(`/api/stores/${storeId}`).then((res) => {
    return res.data.data
  })
}
export const fetchCafeStarPoint = ({ storeId }: { storeId: string }) => {
  return axios.get(`/api/stores/${storeId}/detail-review-score`).then((res) => {
    return res.data.data
  })
}

export const fetchCafeNears = ({ storeId }: { storeId: string }) => {
  return axios.get(`/api/web/stores/${storeId}/near-stores`).then((res) => {
    return res.data.data
  })
}
