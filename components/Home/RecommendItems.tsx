import Image from "next/image"
import Link from "next/link"
import { RecommendDesc, RecommendItem, RecommendItemsWrapper } from "./styles/RecommendStyles"

const RecommendItems = () => {
  return (
    <RecommendItemsWrapper>
      <RecommendItem>
        <Link href="/">
          <a>
            <Image
              src={'/images/temp_img.png'}
              layout="responsive"
              width={364}
              height={240}
            />
            <RecommendDesc>24시간 공부 가능한 카페 7곳</RecommendDesc>
          </a>
        </Link>
      </RecommendItem>
      <RecommendItem>
        <Link href="/">
          <a>
            <Image
              src={'/images/temp_img.png'}
              layout="responsive"
              width={364}
              height={240}
            />
            <RecommendDesc>24시간 공부 가능한 카페 7곳</RecommendDesc>
          </a>
        </Link>
      </RecommendItem>
      <RecommendItem>
        <Link href="/">
          <a>
            <Image
              src={'/images/temp_img.png'}
              layout="responsive"
              width={364}
              height={240}
            />
            <RecommendDesc>24시간 공부 가능한 카페 7곳</RecommendDesc>
          </a>
        </Link>
      </RecommendItem>
      <RecommendItem>
        <Link href="/">
          <a>
            <Image
              src={'/images/temp_img.png'}
              layout="responsive"
              width={364}
              height={240}
            />
            <RecommendDesc>24시간 공부 가능한 카페 7곳</RecommendDesc>
          </a>
        </Link>
      </RecommendItem>
    </RecommendItemsWrapper>
  )
}

export default RecommendItems
