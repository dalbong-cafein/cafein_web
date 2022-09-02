import { useAtomValue } from 'jotai'
import { toastAtom } from 'store'
import styled, { css, keyframes } from 'styled-components'

const Toast = () => {
  const isToast = useAtomValue(toastAtom)
  return <ToastWrapper isToast={isToast}>링크가 복사되었습니다</ToastWrapper>
}
const toast = keyframes`
    0% { opacity: 0; transform: translateY(0);}
    75% { opacity: 1; transform: translateY(-2px);}
    100% { opacity: 0; transform: translateY(0);}
`

const ToastWrapper = styled.div<{ isToast: boolean }>`
  position: absolute;
  bottom: 8px;
  left: 24px;
  width: 352px;
  background-color: ${(props) => props.theme.colors.grey700};
  border-radius: 14px;
  font-weight: 400;
  font-size: ${(props) => props.theme.fontsizes.font15}rem;
  color: white;
  padding: 16px 20px;
  z-index: 1;

  ${(props) =>
    props.isToast
      ? css`
          animation: ${toast} 2s ease;
        `
      : ''}
`

export default Toast
