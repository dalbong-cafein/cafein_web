import { StartWrapper } from '@components/MapsParams/styles/CafePointsSectionStyle'

import Ic_star from '@public/star.svg'
import Ic_empty_star from '@public/empty_star.svg'

export const getStars = (cnt: string) => {
  return (
    <StartWrapper>
      {[1, 2, 3, 4].map((num, idx) => {
        if (num <= +cnt) {
          return <Ic_star key={idx} />
        }
        return <Ic_empty_star key={idx} />
      })}
    </StartWrapper>
  )
}
