import { NextPage } from 'next'
import styled from 'styled-components'
import useMap from '../common/hooks/useMap'

const MapPage: NextPage = () => {
  useMap()
  return (
    <>
      <MapBox id="map"></MapBox>
    </>
  )
}

const MapBox = styled.div`
  width: 100vw;
  height: 100vh;
`

export default MapPage
