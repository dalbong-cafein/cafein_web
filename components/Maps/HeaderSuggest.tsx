import { useSetAtom } from 'jotai'
import { toastAtom } from 'store'
import {
  HeaderWrapper,
  HomeButton,
  SendOpinion,
  StyleCopy,
  TempWrapper,
  Title,
  TitleWrapper
} from './styles/styles'

import Ic_Logo from '@public/logo_black.svg'
import Ic_copy from '@public/copy.svg'
import Link from 'next/link'
import copyUrl from '@utils/copyUrl'

interface Imbti {
  [key: string]: string
}
const mbti: Imbti = {
  서대문구: 'INFP',
  마포구: 'ENTJ',
  동대문구: 'INTJ',
  종로구: 'INFJ',
  강남구: 'ESFJ',
  성북구: 'ESFJ'
}

type ITypes =
  | 'allDay'
  | 'teamPlay'
  | 'noNoonChi'
  | 'alone'
  | 'cafein'
  | 'morning'

const HeaderSectionTemp = ({
  sggNm,
  type
}: {
  sggNm: string
  type: ITypes
}) => {
  const typeEng = {
    allDay: `밤늦게까지\n공부 가능한 카페`,
    teamPlay: '팀플하기 좋은 카페',
    noNoonChi: '눈치보지 않고\n작업할 수 있는 카페',
    alone: '혼자\n공부하기 좋은 카페',
    cafein: `카페인 팀원 ${mbti[sggNm]}가\n추천하는 카페`,
    morning: '아침부터\n작업하기 좋은 카페'
  }
  const setIsToast = useSetAtom(toastAtom)
  return (
    <TempWrapper>
      <HeaderWrapper>
        <Link href="/">
          <a>
            <Ic_Logo />
          </a>
        </Link>
        <SendOpinion
          href="https://forms.gle/dCqeYDvt6ys4Yn7n7"
          target="_blank"
          rel="noreferrer"
        >
          의견 보내기
        </SendOpinion>
      </HeaderWrapper>
      <Link
        href={{
          pathname: '/',
          query: { sggNm, recommend: true }
        }}
      >
        <HomeButton>&apos;{sggNm}&apos;추천 카페 모두 보기</HomeButton>
      </Link>
      <TitleWrapper>
        <Title>{typeEng[type]}</Title>
        <StyleCopy>
          <Ic_copy onClick={() => copyUrl(window.location.href, setIsToast)} />
        </StyleCopy>
      </TitleWrapper>
    </TempWrapper>
  )
}

export default HeaderSectionTemp
