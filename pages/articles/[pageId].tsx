import {
  AspectRatio,
  Box,
  Center,
  Flex,
  Image,
  Spacer,
  Spinner,
  Text,
} from '@chakra-ui/react'
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons'
import {
  faHeart as faSolidHeart,
  faHome,
} from '@fortawesome/free-solid-svg-icons'
import { GetPageResponse } from '@notionhq/client/build/src/api-endpoints'
import { Block } from 'components/blocks/block'
import { IconButton } from 'components/icon_button'
import { LinkIconButton } from 'components/link_icon_button'
import 'extensions/date'
import { useUserStatus } from 'hooks/useUserStatus'
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

const like: ({
  articlePageId,
  userPageId,
}: {
  articlePageId: string
  userPageId: string
}) => Promise<void> = async ({ articlePageId, userPageId }) => {
  await fetch(`/api/like_article/${articlePageId}/${userPageId}`)
}

const destroyLike: ({
  articlePageId,
  userPageId,
}: {
  articlePageId: string
  userPageId: string
}) => Promise<void> = async ({ articlePageId, userPageId }) => {
  await fetch(`/api/destroy_liked_article/${articlePageId}/${userPageId}`)
}

type Props = {
  pageData: GetPageResponse
}

const ArticlePage: NextPage<Props> = (props) => {
  const router = useRouter()
  const { pageId } = router.query
  const { user, userPageId } = useUserStatus()
  const username = user?.getUsername()

  const isLikedResponse = useSWR<boolean, Error>(
    `/api/check_liked_article/${props.pageData.id}/${userPageId}`,
    (url) => fetch(url).then((r) => r.json()),
  )
  const blocksResponse = useSWR<any, Error>(
    `/api/retrive_page_blocks/${pageId}`,
    (url) => fetch(url).then((r) => r.json()),
  )

  let isLiked = false
  if (!isLikedResponse.error && isLikedResponse.data) {
    isLiked = isLikedResponse.data
  }

  const blocksData = blocksResponse.data
  const blocksError = blocksResponse.error
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
            <Flex align="center" position="relative" bottom={[5, 10]}>
              <Spacer />
              <LinkIconButton href="/" icon={faHome} />
              <Spacer />
              {username != undefined && (
                <IconButton
                  icon={isLiked ? faSolidHeart : faRegularHeart}
                  onClick={async () => {
                    if (isLiked) {
                      await destroyLike({
                        articlePageId: pageData.id,
                        userPageId: userPageId as string,
                      })
                    } else {
                      await like({
                        articlePageId: pageData.id,
                        userPageId: userPageId as string,
                      })
                    }
                    await isLikedResponse.mutate()
                  }}
                />
              )}

              <Spacer />
            </Flex>
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
