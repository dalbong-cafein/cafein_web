import Link from "next/link"
import { CopyRight, FooterQLists, FooterWrapper, QItem } from "./styles/FooterStyles"

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterQLists>
        <QItem>
          <Link href="/">공지사항</Link>
        </QItem>
        <QItem>
          <Link href="/">자주 묻는 질문</Link>
        </QItem>
        <QItem>
          <Link href="/">이용약관</Link>
        </QItem>
      </FooterQLists>
      <FooterQLists>
        <QItem>
          <Link href="mailto:dalbong.cafeing@gmail.com">
            dalbong.cafeing@gmail.com
          </Link>
        </QItem>
        <QItem>
          <Link href="/">인스타그램</Link>
        </QItem>
      </FooterQLists>
      <CopyRight>COPYRIGHT © 2022 cafein ALL RIGHTS RESERVED.</CopyRight>
    </FooterWrapper>
  )
}

export default Footer