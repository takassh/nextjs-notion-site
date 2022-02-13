import { AspectRatio, Box, Center, Flex, Image, Text } from '@chakra-ui/react'
import {
  GetPageResponse,
  ListBlockChildrenResponse,
} from '@notionhq/client/build/src/api-endpoints'
import Head from 'next/head'
import { GetServerSideProps, NextPage } from 'next/types'
import { RetrivePage, RetrivePageBlocks } from '../../api/api'
import {
  Bold,
  BulletedListItem,
  CodeBlock,
  EmptyBlock,
  H1,
  InlineCode,
  NormalText,
} from '../../components/text'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query
  const pageResponse = await RetrivePage(id as string)
  const blocksResponse = await RetrivePageBlocks(id as string)
  return {
    props: {
      pageResponse,
      blocksResponse,
    },
  }
}

type Props = {
  pageResponse: GetPageResponse
  blocksResponse: ListBlockChildrenResponse
}

const getParagraph = (
  id: string,
  text: {
    text: { content: string; link: string }
    annotations: {
      bold: boolean
      italic: boolean
      strikethrough: boolean
      underline: boolean
      code: boolean
      color: 'default'
    }
    plain_text: string
    href: string
  }[],
) => {
  if (text.length != 0) {
    return text.map((v, i) => {
      if (v.annotations.bold) {
        return <Bold key={`bold-${i}`} text={v.plain_text} />
      } else if (v.annotations.italic) {
      } else if (v.annotations.strikethrough) {
      } else if (v.annotations.underline) {
      } else if (v.annotations.code) {
        return <InlineCode key={`inline-code-${i}`} text={v.plain_text} />
      }
      return <NormalText key={`normal-${i}`} text={v.plain_text} />
    })
  } else {
    return <EmptyBlock key={`empty-${id}`} />
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

const ArticlePage: NextPage<Props> = (props) => {
  const pageResponse = props.pageResponse as any
  const blocksResponse = props.blocksResponse as any

  const coverUrl = pageResponse.cover.external.url
  const title = pageResponse.properties.name.title[0].plain_text
  const date = new Date(pageResponse.created_time)

  const results = blocksResponse.results as {
    id: string
    type: string
    paragraph: { text: [] }
    heading_1: { text: { plain_text: string }[] }
    code: { text: { plain_text: string }[] }
    bulleted_list_item: { text: { plain_text: string }[] }
  }[]
  const mapping = results.map((v, i) => {
    switch (v.type) {
      case 'paragraph':
        const text = v.paragraph.text as []
        return getParagraph(v.id, text)
      case 'heading_1':
        const h1 = v.heading_1.text[0].plain_text
        return <H1 key={`heading_1-${i}`} text={h1} />
      case 'code':
        const code = v.code.text[0].plain_text
        return <CodeBlock key={`code-${i}`} text={code} />
      case 'bulleted_list_item':
        const bulletedListItem = v.bulleted_list_item.text[0].plain_text
        return (
          <BulletedListItem
            key={`bulleted_list_item-${i}`}
            text={bulletedListItem}
          />
        )
    }
  })

  const body = mapping.flat()

  return (
    <>
      <Head>
        <meta property="og:title" content={title} />
        <meta property="og:image" content={coverUrl} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Flex width="full" direction="column">
        <Box marginTop={[2, 4]} marginX={[4, 16]}>
          <AspectRatio ratio={[2 / 1, 4 / 1]} backgroundColor="transparent">
            <Image shadow="2xl" rounded="lg" src={coverUrl} />
          </AspectRatio>
        </Box>
        <Center marginTop={[8, 24]} marginBottom="12">
          <Flex align="center" direction="column">
            <Text fontWeight="bold" fontSize={['lg', '4xl']}>
              {title}
            </Text>
            <Text
              marginY="4"
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase">
              {getformattedDateTime(date)}
            </Text>
          </Flex>
        </Center>
        <Box marginX={[2, 24]}>{body}</Box>
      </Flex>
    </>
  )
}

export default ArticlePage
