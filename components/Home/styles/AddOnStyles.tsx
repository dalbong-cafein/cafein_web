import styled from 'styled-components'

export const AddWrapper = styled.div`
  display: flex;
  margin-top: 100px;
  padding: 84px 140px;
  background-image: url('/images/Cafein.svg');
  background-repeat: no-repeat;
  background-blend-mode: multiply;
  background-color: ${(props) => props.theme.colors.grey100};
  background-position: right 11% top 50%;
  border-radius: 20px;
  @media screen and (max-width: 900px) {
    padding: 24px 28px;
    background-size: 263px 156px;
  }
  @media screen and (max-width: 495px) {
    padding: 24px 28px;
    background-size: 196px 115px;
  }
  @media screen and (max-width: 455px) {
    padding: 24px 28px;
    background-size: 144px 81px;
  }
  @media screen and (max-width: 380px) {
    padding: 24px 28px;
    background-size: 108px 59px;
  }
`

export const AddLink = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 50%;
`

export const AddLinkText = styled.p`
  font-size: ${(props) => props.theme.fontsizes.font23}rem;
  font-weight: 600;
  @media screen and (max-width: 900px) {
    font-size: 16px;
    width: 133px;
  }
`

export const AddButton = styled.button`
  border-radius: 14px;
  background-color: ${(props) => props.theme.colors.grey600};
  padding: 12px 16px;
  font-weight: 500;
  font-size: ${(props) => props.theme.fontsizes.font16}rem;
  color: ${(props) => props.theme.colors.white};

  &:hover,
  &:focus {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.08)),
      #646464;
  }
  @media screen and (max-width: 900px) {
    font-size: 15px;
  }
`
