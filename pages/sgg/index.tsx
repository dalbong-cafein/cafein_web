import { ReactElement } from 'react'
import { NextPageWithLayout } from '../_app'

const Sgg: NextPageWithLayout = () => {
  return
}

Sgg.getLayout = function getLayout(page: ReactElement) {
  return <MapLayout>{page}</MapLayout>
}

export default Sgg
