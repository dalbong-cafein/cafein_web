import Link from 'next/link'
import {
  AddButton2,
  AddLink2,
  AddLinkText2,
  AddWrapper2
} from './styles/AnnounceStyle'

const AnnounceSection = () => {
  return (
    <AddWrapper2>
      <AddLink2>
        <AddLinkText2>추천하고 싶은 카페가 있다면 알려주세요</AddLinkText2>
        <a
          href="https://forms.gle/F4JChJGvWne3uDxe9"
          target="_blank"
          rel="noreferrer"
        >
          <AddButton2>카페 등록하기</AddButton2>
        </a>
      </AddLink2>
    </AddWrapper2>
  )
}

export default AnnounceSection
