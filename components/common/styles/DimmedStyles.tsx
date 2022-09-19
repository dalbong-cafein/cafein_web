import styled from 'styled-components'

export const DimmedAlertWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 16px;
  padding: 30px 16px 16px;
  gap: 22px;
`

export const DimmedAlertHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
`

export const DimmedAlertTitle = styled.p`
  font-weight: 700;
  font-size: ${(props) => props.theme.fontsizes.font17}rem;
  color: ${(props) => props.theme.colors.grey800};
`

export const DimmedAlertSubTitle = styled.p`
  font-weight: 400;
  font-size: ${(props) => props.theme.fontsizes.font14}rem;
  color: ${(props) => props.theme.colors.grey600};
  text-align: center;
`

export const DimmedAlertBtn = styled.button`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 44px;
  border-radius: 12px;
  background-color: ${(props) => props.theme.colors.orange400};
  font-size: ${(props) => props.theme.fontsizes.font15}rem;
  font-weight: 500;
  color: white;

  &:hover {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)),
      #fc7521;
  }
`
