import FirstLine from '@components/MapsParams/FirstLine'
import SecondLine from '@components/MapsParams/SecondLine'
import useWindowSize from 'hooks/useWindowSize'
import Link from 'next/link'

import {
  CopyRight,
  FooterQLists,
  FooterWrapper,
  QItem
} from './styles/FooterStyles'

interface IFooterProps {
  isHome: boolean
}

const Footer = ({ isHome }: IFooterProps) => {
  const windowSize = useWindowSize()
  return windowSize.width ? (
    <FooterWrapper isHome={isHome}>
      <FooterQLists isTop={true}>
        <QItem>
          <Link href="mailto:dalbong.cafeing@gmail.com">E-mail</Link>
        </QItem>
        <QItem>
          <a
            href="https://www.instagram.com/cafein.kr"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
        </QItem>
      </FooterQLists>
      {windowSize.width <= 900 ? (
        <>
          <FooterQLists>
            <FirstLine />
          </FooterQLists>
          <FooterQLists>
            <SecondLine />
          </FooterQLists>
        </>
      ) : (
        <FooterQLists>
          <FirstLine />
          <SecondLine />
        </FooterQLists>
      )}
      <CopyRight>COPYRIGHT © 2022 cafein ALL RIGHTS RESERVED.</CopyRight>
    </FooterWrapper>
  ) : (
    <></>
  )
}

export default Footer
