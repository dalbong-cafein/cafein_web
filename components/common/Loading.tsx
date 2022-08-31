import { Player } from '@lottiefiles/react-lottie-player'
import LottieJson from 'public/94044-loading-animation.json'
import styled from 'styled-components'
const Loading = ({ isSuggestion }: { isSuggestion?: boolean }) => {
  return (
    <LoadingWrapper isSuggestion={isSuggestion}>
      <Player
        autoplay
        loop
        src={LottieJson}
        style={{ height: '114px', width: '114px' }}
      ></Player>
    </LoadingWrapper>
  )
}

const LoadingWrapper = styled.div<{ isSuggestion?: boolean }>`
  display: flex;
  width: 100%;
  height: ${(props) =>
    props.isSuggestion ? 'calc(100vh - 241.53px)' : 'calc(100vh - 185.03px)'};
  justify-content: center;
  align-items: center;
`

export default Loading
