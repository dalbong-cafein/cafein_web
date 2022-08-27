import { SetStateAction } from 'react'

import common from './Common'

import {
  DimmedAlertBtn,
  DimmedAlertHeader,
  DimmedAlertSubTitle,
  DimmedAlertTitle,
  DimmedAlertWrapper
} from './styles/styles'

interface IDimmedAlert {
  setIsDimmed: (update: SetStateAction<boolean>) => void
}

const DimmedAlert = ({ setIsDimmed }: IDimmedAlert) => {
  return (
    <common.DimmedWrapper
      isSearch={false}
      isAll={true}
      onClick={(e) => {
        if (e.currentTarget === e.target) setIsDimmed(false)
      }}
    >
      <DimmedAlertWrapper>
        <DimmedAlertHeader>
          <DimmedAlertTitle>준비중인 기능입니다</DimmedAlertTitle>
          <DimmedAlertSubTitle>
            빠른 시일 내에 이용하실 수 있도록
            <br />
            열심히 노력할게요
          </DimmedAlertSubTitle>
        </DimmedAlertHeader>
        <DimmedAlertBtn onClick={() => setIsDimmed(false)}>확인</DimmedAlertBtn>
      </DimmedAlertWrapper>
    </common.DimmedWrapper>
  )
}

export default DimmedAlert
