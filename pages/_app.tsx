import { Box, ChakraProvider } from '@chakra-ui/react'
import { store } from 'ducks/store'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { MoralisProvider } from 'react-moralis'
import { Provider } from 'react-redux'
import { Footer } from '../components/footer'
import { theme } from '../theme'

function MyApp({ Component, pageProps }: AppProps) {
  const appId = process.env.NEXT_PUBLIC_MORALIS_APP_ID ?? ''
  const serverUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL ?? ''

  return (
    <>
      <Head>
        <title>Takassh Dev Blog</title>
        <meta name="description" content="takassh dev blog" />
        <meta property="og:description" content="takassh dev blog" />
      </Head>
      <Provider store={store}>
        <MoralisProvider appId={appId} serverUrl={serverUrl}>
          <ChakraProvider theme={theme}>
            <Box as="main" width="full">
              <Component {...pageProps} />
            </Box>
            <Box width="full" paddingTop={['10']} paddingX={['10']}>
              <Footer />
            </Box>
          </ChakraProvider>
        </MoralisProvider>
      </Provider>
    </>
  )
}

export default MyApp
