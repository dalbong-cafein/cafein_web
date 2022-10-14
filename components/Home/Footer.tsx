import useFirstLine from 'hooks/useFirstLine'
import useSecondLine from 'hooks/useSecondLine'
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
  const firstLine = useFirstLine()
  const secondLine = useSecondLine()
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
          <FooterQLists>{firstLine}</FooterQLists>
          <FooterQLists>{secondLine}</FooterQLists>
        </>
      ) : (
        <FooterQLists>
          {firstLine}
          {secondLine}
        </FooterQLists>
      )}
      <CopyRight>COPYRIGHT © 2022 cafein ALL RIGHTS RESERVED.</CopyRight>
    </FooterWrapper>
  ) : (
    <></>
  )
}

export default Footer
