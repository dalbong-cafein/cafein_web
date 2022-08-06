import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      grey900: string
      grey800: string
      grey700: string
      grey600: string
      grey500: string
      grey400: string
      grey300: string
      grey200: string
      grey100: string
      grey50: string
      orange500: string
      orange400: string
      white: string
      black: string
      blue: string
    }
    fontsizes: {
      font40: number
      font28: number
      font24: number
      font23: number
      font19: number
      font16: number
      font15: number
      font14: number
      font13: number
      font12: number
    }
    borderRadius: {
      border4: number
      border8: number
      border12: number
      border16: number
    }
    widthes: {
      maxWidth: number
      maxBarList: number
      minBarList: number
    }
    marginTop: {
      margin40: number
      margin30: number
      navHeight: number
    }
    buttons: {
      whiteButton: string
      orangeButton: string
    }
    mixins: {
      scroll_x: string
      ellipse: string
    }
  }
}
