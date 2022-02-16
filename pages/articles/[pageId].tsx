import {
  AspectRatio,
  Box,
  Center,
  Flex,
  Image,
  Spinner,
  Text,
} from '@chakra-ui/react'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { GetPageResponse } from '@notionhq/client/build/src/api-endpoints'
import { Block } from 'components/blocks/block'
import { LinkIconButton } from 'components/link_icon_button'
import 'extensions/date'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { GetServerSideProps, NextPage } from 'next/types'
import useSWR from 'swr'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { pageId } = context.query
  const res = await fetch(`${process.env.APP_URL}/api/retrive_page/${pageId}`)
  const pageData = await res.json()
  return {
    props: {
      pageData,
    },
  }
}

type Props = {
  pageData: GetPageResponse
}

const ArticlePage: NextPage<Props> = (props) => {
  const router = useRouter()
  const { pageId } = router.query
  const blocks = useSWR<any, Error>(
    `/api/retrive_page_blocks/${pageId}`,
    (url) => fetch(url).then((r) => r.json()),
  )

  const blocksData = blocks.data
  const blocksError = blocks.error
  let blocksComponent = <></>

  const pageData = props.pageData as any
  const coverUrl = pageData.cover?.external?.url ?? pageData.cover?.file?.url
  const title = pageData.properties.name.title[0].plain_text
  const date = new Date(pageData.created_time)

  if (blocksError || !blocksData) {
    blocksComponent = (
      <Center>
        <Spinner />
      </Center>
    )
  } else {
    blocksComponent = <Box marginX={[4, 24]}>{Block(blocksData.results)}</Box>
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:image" content={coverUrl} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Flex marginTop={[2, 4]} width="full" direction="column">
        <>
          <Box marginX={[2, 16]}>
            <AspectRatio ratio={[2 / 1, 4 / 1]} backgroundColor="transparent">
              <Image shadow="2xl" rounded="lg" src={coverUrl} />
            </AspectRatio>
            <Box position="relative" left={['2', '4']} bottom={[5, 10]}>
              <LinkIconButton href="/" icon={faHome} />
            </Box>
          </Box>
          <Center marginX={[2, 24]} marginBottom="12">
            <Flex maxWidth="100%" align="center" direction="column">
              <Text
                maxWidth="100%"
                fontWeight="bold"
                fontSize={['2xl', '4xl']}
                isTruncated>
                {title}
              </Text>
              <Text
                marginY="4"
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase">
                {date.formattedDateTime()}
              </Text>
            </Flex>
          </Center>
        </>
        {blocksComponent}
      </Flex>
    </>
  )
}

export default ArticlePage
