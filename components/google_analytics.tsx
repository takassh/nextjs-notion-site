import { useRouter } from 'next/router'
import Script from 'next/script'
import { useEffect, VFC } from 'react'

const GA_ID = process.env.GA_I as string
const isProduction = process.env.NODE_ENV == 'production'

const pageview = (path: string) => {
  window.gtag('config', GA_ID, {
    page_path: path,
  })
}

export const usePageView = () => {
  const router = useRouter()

  useEffect(() => {
    if (!isProduction) {
      return
    }

    const handleRouteChange = (path: string) => {
      pageview(path)
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
}

export const GoogleAnalyticsTag: VFC = () => {
  return (
    <>
      {isProduction && (
        <>
          <Script
            defer
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga" defer strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
          `}
          </Script>
        </>
      )}
    </>
  )
}
