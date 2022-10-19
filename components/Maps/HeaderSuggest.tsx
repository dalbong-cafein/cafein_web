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
import { ItypeEng, ITypes } from 'suggestions'
import useTypeEng from 'hooks/useTypeEng'

const HeaderSectionTemp = ({
  sggNm,
  type
}: {
  sggNm: string
  type: ITypes
}) => {
  const [typeEng, setTypeEng] = useTypeEng(sggNm)
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
        <Title>{(typeEng as ItypeEng)[type]}</Title>
        <StyleCopy>
          <Ic_copy onClick={() => copyUrl(window.location.href, setIsToast)} />
        </StyleCopy>
      </TitleWrapper>
    </TempWrapper>
  )
}

export default HeaderSectionTemp
