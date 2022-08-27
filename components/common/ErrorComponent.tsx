import styled from 'styled-components'

import ErrorIcon from '@public/error_img.svg'

const ErrorComponent = ({ storeName }: { storeName?: string }) => {
  return (
    <ErrorWrapper>
      <ErrorIcon />
      {storeName ? (
        <ErrorText>
          <ErrorTextStrong>{storeName}</ErrorTextStrong>의 검색 결과가 없습니다.
        </ErrorText>
      ) : (
        <ErrorText>카페를 검색해 보세요!</ErrorText>
      )}
    </ErrorWrapper>
  )
}

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  margin: 140px auto;
`

const ErrorText = styled.p`
  font-weight: 400;
  font-size: ${(props) => props.theme.fontsizes.font14}rem;
  color: ${(props) => props.theme.colors.grey800};
`

const ErrorTextStrong = styled.span`
  font-weight: 500;
  color: ${(props) => props.theme.colors.orange500};
`

export default ErrorComponent
