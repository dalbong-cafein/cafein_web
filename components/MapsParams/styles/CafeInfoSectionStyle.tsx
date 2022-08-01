import styled from "styled-components"

export const CafeInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 30px 24px;
  position: relative;

  &:not(first-child) {
    &::before {
      content: '';
      height: 2px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      background-color: ${(props) => props.theme.colors.grey100};
    }
  }
`

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const HeaderTitle = styled.h1`
  font-weight: 600;
  font-size: ${(props) => props.theme.fontsizes.font16}rem;
`

export const DDabongWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`

export const DDabongPoints = styled.span`
  font-size: ${(props) => props.theme.fontsizes.font12}rem;
  color: ${(props) => props.theme.colors.grey600};
  font-weight: 400;
`

export const SubTitle = styled.h2`
  font-weight: 400;
  font-size: ${(props) => props.theme.fontsizes.font13}rem;
  color: ${(props) => props.theme.colors.grey600};
  margin-top: 10px;
`

export const OpenInfoWrapper = styled.div`
  display: flex;
  margin-top: 12px;
  align-items: center;
  gap: 8px;
`

export const ClockIcon = styled.span`
  width: 20px;
  height: 20px;
`

export const DescWrapper = styled.div`
  display: flex;
  gap: 4px;
`

export const Description = styled.p`
  display: flex;
  font-size: ${(props) => props.theme.fontsizes.font15}rem;
  color: ${(props) => props.theme.colors.grey800};
  font-weight: 400;
  gap: 2px;
`

export const ArrowButton = styled.button<{ isOpened: boolean }>`
  background-image: url('/images/down_arrow.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-color: transparent;
  width: 16px;
  height: 16px;
  margin-left: 6px;
  transition: all ease 0.4s;
  transform: ${(props) => (props.isOpened ? 'rotate(180deg)' : '')};
`

export const DailyTimeWrapper = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 8px;
  margin-left: 28px;
`

export const DayTimeWrapper = styled.li`
  display: flex;
  gap: 4px;
`

export const Day = styled.p<{ isRunning: boolean; isToday: boolean }>`
  font-size: ${(props) => props.theme.fontsizes.font15}rem;
  font-weight: 400;
  color: ${(props) =>
    props.isRunning && props.isToday
      ? props.theme.colors.orange500
      : props.theme.colors.grey500};
`

export const Time = styled.p<{ isRunning: boolean; isToday: boolean }>`
  font-size: ${(props) => props.theme.fontsizes.font15}rem;
  font-weight: 400;
  color: ${(props) =>
    props.isRunning && props.isToday
      ? props.theme.colors.orange500
      : props.theme.colors.grey800};
`

export const CallDescription = styled.a`
  color: ${(props) => props.theme.colors.blue};
  font-size: ${(props) => props.theme.fontsizes.font15}rem;
  font-weight: 400;
`

export const URLDescription = styled(CallDescription)`
  color: ${(props) => props.theme.colors.grey800};
`

export const StrongSpan = styled.span<{ isRunning: boolean }>`
  color: ${(props) =>
    props.isRunning
      ? props.theme.colors.orange500
      : props.theme.colors.grey500};
  font-weight: 600;
  font-size: ${(props) => props.theme.fontsizes.font15}rem;
`

export const EditInfoWrapper = styled.div`
  display: flex;
  height: 30px;
  align-items: center;
  margin-top: 12px;
`

export const EditInfoButton = styled.button`
  width: 74px;
  height: 30px;
  border: 1px solid ${(props) => props.theme.colors.grey400};
  border-radius: 8px;
  font-size: ${(props) => props.theme.fontsizes.font13}rem;
  color: ${(props) => props.theme.colors.grey600};
  font-weight: 500;
  background-color: transparent;
`

export const EditDesc = styled.p`
  font-size: ${(props) => props.theme.fontsizes.font13}rem;
  color: ${(props) => props.theme.colors.grey600};
  margin-left: 14px;
  font-weight: 400;
`

export const EditDateDesc = styled.p`
  font-size: ${(props) => props.theme.fontsizes.font12}rem;
  color: ${(props) => props.theme.colors.grey500};
  opacity: 0.4;
  margin-left: 12px;
  font-weight: 400;
`