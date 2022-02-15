import { Box, ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Footer } from '../components/footer'
import '../styles/globals.css'
import { theme } from '../theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Takassh Dev Blog</title>
        <meta name="description" content="takassh dev blog" />
        <meta property="og:description" content="takassh dev blog" />
      </Head>
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
