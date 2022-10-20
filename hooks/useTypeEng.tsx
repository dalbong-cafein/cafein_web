import { useState } from 'react'
import { Imbti } from 'suggestions'

const mbti: Imbti = {
  서대문구: 'INFP',
  마포구: 'ENTJ',
  동대문구: 'INTJ',
  종로구: 'INFJ',
  강남구: 'ESFJ',
  성북구: 'ESFJ'
}

const useTypeEng = (sggNm: string) => {
  const [typeEng, setTypeEng] = useState({
    allDay: `밤늦게까지\n공부 가능한 카페`,
    teamPlay: '팀플하기 좋은 카페',
    noNoonChi: '눈치보지 않고\n작업할 수 있는 카페',
    alone: '혼자\n공부하기 좋은 카페',
    cafein: `카페인 팀원 ${mbti[sggNm]}가\n추천하는 카페`,
    morning: '아침부터\n작업하기 좋은 카페'
  })
  return [typeEng, setTypeEng]
}

export default useTypeEng
