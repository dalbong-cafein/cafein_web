import { Props } from 'next/script'
import Map from './Map'

const MapLayout = ({ children }: Props) => {
  return (
    <>
      {children}
      <Map />
    </>
  )
}

export default MapLayout
