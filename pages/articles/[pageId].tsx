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
import 'extensions/date'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { GetServerSideProps, NextPage } from 'next/types'
import useSWR from 'swr'
import { Block } from '../../components/blocks/block'
import { LinkIconButton } from '../../components/link_icon_button'

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  }
}

const getformattedDateTime = (date: Date) =>
  `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(
    2,
    '0',
  )}/${String(date.getDate()).padStart(2, '0')} ${String(
    date.getHours(),
  ).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(
    date.getSeconds(),
  ).padStart(2, '0')}`

const ArticlePage: NextPage = () => {
  const router = useRouter()
  const { pageId } = router.query
  const page = useSWR<any, Error>(`/api/retrive_page/${pageId}`, (url) =>
    fetch(url).then((r) => r.json()),
  )
  const blocks = useSWR<any, Error>(
    `/api/retrive_page_blocks/${pageId}`,
    (url) => fetch(url).then((r) => r.json()),
  )

  const pageData = page.data
  const pageError = page.error
  const blocksData = blocks.data
  const blocksError = blocks.error

  let pageComponent = <></>
  let headComponent = <></>
  let blocksComponent = <></>

  if (pageError || !pageData) {
    pageComponent = (
      <Center>
        <Spinner />
      </Center>
    )
  } else {
    const coverUrl = pageData.cover?.external?.url ?? pageData.cover?.file?.url
    const title = pageData.properties.name.title[0].plain_text
    const date = new Date(pageData.created_time)

    headComponent = (
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:image" content={coverUrl} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
    )
    pageComponent = (
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
    )
  }

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
      {headComponent}
      <Flex marginTop={[2, 4]} width="full" direction="column">
        {pageComponent}
        {blocksComponent}
      </Flex>
    </>
  )
}

export default ArticlePage
