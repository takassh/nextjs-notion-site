import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  shadows: {
    outline: 'none',
  },
  fonts: {
    heading:
      'Inter, Helvetica Neue, Helvetica, Hiragino Sans, Hiragino Kaku Gothic ProN, Arial, Yu Gothic, Meiryo, sans-serif',
    body: 'Inter, Noto Sans JP, Hiragino Kaku Gothic ProN, Proxima Nova, Verdana, 游ゴシック, YuGothic, Meiryo, sans-serif',
  },
  initialColorMode: 'light',
  useSystemColorMode: false,
})
