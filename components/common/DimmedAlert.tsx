import { useAtom } from 'jotai'
import { IDimmed, isDimmedAtom } from 'store'
import { DimmedWrapper } from './Common'

import {
  DimmedAlertBtn,
  DimmedAlertHeader,
  DimmedAlertSubTitle,
  DimmedAlertTitle,
  DimmedAlertWrapper,
  DimmedBtnWrapper
} from './styles/styles'

const DimmedAlert = () => {
  const [isDimmed, setIsDimmed] = useAtom(isDimmedAtom)
  const { title, body, type, callback } = isDimmed as IDimmed
  const onClickHandler = () => {
    setIsDimmed(null)
    callback && callback()
  }
  return (
    <DimmedWrapper
      isSearch={false}
      isAll={true}
      onClick={(e) => {
        if (e.currentTarget === e.target) onClickHandler()
      }}
    >
      <DimmedAlertWrapper>
        <DimmedAlertHeader>
          <DimmedAlertTitle>{title}</DimmedAlertTitle>
          <DimmedAlertSubTitle>{body}</DimmedAlertSubTitle>
        </DimmedAlertHeader>
        <DimmedBtnWrapper>
          <DimmedAlertBtn onClick={onClickHandler}>확인</DimmedAlertBtn>
          {type === 'confirm' ? (
            <DimmedAlertBtn isCancel={true} onClick={() => setIsDimmed(null)}>
              취소
            </DimmedAlertBtn>
          ) : (
            ''
          )}
        </DimmedBtnWrapper>
      </DimmedAlertWrapper>
    </DimmedWrapper>
  )
}

export default DimmedAlert
