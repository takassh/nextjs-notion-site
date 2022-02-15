import { Box, ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Footer } from '../components/footer'
import { GoogleAnalyticsTag, usePageView } from '../components/google_analytics'
import '../styles/globals.css'
import { theme } from '../theme'

function MyApp({ Component, pageProps }: AppProps) {
  usePageView()

  return (
    <>
      <Head>
        <title>Takassh Blog</title>
        <meta name="description" content="takassh blog" />
        <meta property="og:description" content="takassh blog" />
      </Head>
      <GoogleAnalyticsTag />
      <ChakraProvider theme={theme}>
        <Box as="main" width="full">
          <Component {...pageProps} />
        </Box>
        <Box width="full" paddingTop={['10']} paddingX={['10']}>
          <Footer />
        </Box>
      </ChakraProvider>
    </>
  )
}

export default MyApp
