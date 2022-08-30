const socket = {
  '1': '바닥을 기어봐도 없어요',
  '2': '찾기 힘들어요',
  '3': '여유 있어요',
  '4': '모든 자리에 있어요'
}
const wifi = {
  '1': '없어요 그냥 없어요',
  '2': '자주 끊겨서 화나요',
  '3': '그냥저냥 쓸 만해요',
  '4': '빵빵 잘 터져요'
}
const restroom = {
  '1': '없어요 그냥 없어요',
  '2': '이용하기 꺼려져요',
  '3': '그냥저냥 쓸 만해요',
  '4': '화장실 맛집이예요'
}
const table = {
  '1': '카공을 허락하지 않아요',
  '2': '오래 쓰면 몸이 아파요',
  '3': '그냥저냥 쓸 만해요',
  '4': '매우 편하게 사용 가능해요'
}

export const getSocketPhrase = (score: '1' | '2' | '3' | '4') => {
  return socket[score]
}
export const getWifiPhrase = (score: '1' | '2' | '3' | '4') => {
  return wifi[score]
}
export const getRestroomPhrase = (score: '1' | '2' | '3' | '4') => {
  return restroom[score]
}
export const getTablePhrase = (score: '1' | '2' | '3' | '4') => {
  return table[score]
}
