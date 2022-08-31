import styled from 'styled-components'

const MainWrapper = styled.div`
  position: relative;
  z-index: 2;
  min-height: 100vh;
  max-height: 100vh;
  width: 100%;
  background-color: ${(props) => props.theme.colors.white};
  max-width: 400px;
  min-width: 375px;
  filter: drop-shadow(8px 0px 20px rgba(0, 0, 0, 0.08));
`

const CafeList = styled.ul`
  border-top: 1px solid ${(props) => props.theme.colors.grey100};
  display: flex;
  flex-direction: column;
  height: calc(100vh - 185.03px);
  overflow-y: auto;

  & li:not(:first-child)::after {
    content: '';
    position: absolute;
    left: 24px;
    right: 24px;
    top: 0;
    border-top: 1px solid ${(props) => props.theme.colors.grey100};
  }
  & li {
    padding: 20px 24px;
  }
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.grey300};
    border-radius: 4px;
  }
`

const DetailWrapper = styled.div`
  position: absolute;
  left: 400px;
  top: 0;
  min-height: 100vh;
  max-height: 100vh;
  width: 100%;
  background-color: ${(props) => props.theme.colors.white};
  max-width: 400px;
  min-width: 375px;
  z-index: 1;
  filter: drop-shadow(8px 0px 20px rgba(0, 0, 0, 0.08));

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.grey300};
    border-radius: 4px;
  }
`

export { MainWrapper, DetailWrapper, CafeList }
export * from './MapStyle'
export * from './ShortCafeStyles'
export * from './RegionListStyles'
export * from './FormStyles'
