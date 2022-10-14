import styled from 'styled-components'

export const AddWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 100px;
  padding: 84px 140px;
  background-color: ${(props) => props.theme.colors.grey100};
  border-radius: 20px;
  height: 240px;
  position: relative;

  @media screen and (max-width: 900px) {
    padding: 24px 14px 24px 28px;
    margin-top: 24px;
    justify-content: space-around;
    height: 140px;
  }

  @media screen and (max-width: 320px) {
    padding-right: 12px;
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

  @media screen and (max-width: 900px) {
    gap: 10px;
  }
`

export const AddLinkText = styled.p`
  font-size: ${(props) => props.theme.fontsizes.font23}rem;
  font-weight: 600;
  word-break: keep-all;
  @media screen and (max-width: 900px) {
    font-size: 16px;
    width: 133px;
    line-height: 1.4;
  }
`

export const AddButton = styled.button`
  border-radius: 14px;
  background-color: ${(props) => props.theme.colors.grey600};
  height: 44px;
  padding: 0 16px;
  font-weight: 500;
  font-size: ${(props) => props.theme.fontsizes.font16}rem;
  color: ${(props) => props.theme.colors.white};
  line-height: 1;

  &:hover,
  &:focus {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.08)),
      #646464;
  }
  @media screen and (max-width: 900px) {
    font-size: 15px;
    height: 36px;
  }
`

export const IcCafeinWrapper = styled.div`
  width: min(100%, 362px);
  height: 0;
  padding-top: calc(min(100%, 362px) * 0.5635);
  position: relative;

  & img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-blend-mode: multiply;
  }

  @media screen and (max-width: 350px) {
    width: 144px;
    height: 81px;
  }

  @media screen and (max-width: 320px) {
    width: 106px;
    height: 59px;
  }
`
