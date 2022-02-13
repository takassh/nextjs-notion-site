import { AspectRatio, Box, Center, Flex, Image, Text } from '@chakra-ui/react'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import {
  GetPageResponse,
  ListBlockChildrenResponse,
} from '@notionhq/client/build/src/api-endpoints'
import Head from 'next/head'
import { GetServerSideProps, NextPage } from 'next/types'
import { RetrivePage, RetrivePageBlocks } from '../../api/api'
import { BulletedListItem } from '../../components/blocks/bulleted_list_item'
import { CodeBlock } from '../../components/blocks/code'
import { H1 } from '../../components/blocks/h1'
import { H2 } from '../../components/blocks/h2'
import { H3 } from '../../components/blocks/h3'
import { ImageBlock } from '../../components/blocks/image'
import { Paragraph } from '../../components/blocks/paragraph'
import { LinkIconButton } from '../../components/link_icon_button'

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

  const coverUrl =
    pageResponse.cover?.external?.url ?? pageResponse.cover?.file?.url
  const title = pageResponse.properties.name.title[0].plain_text
  const date = new Date(pageResponse.created_time)

  const results = blocksResponse.results as {
    id: string
    type: string
    paragraph: { text: [] }
    heading_1: { text: [] }
    heading_2: { text: [] }
    heading_3: { text: [] }
    code: { text: { plain_text: string; href: string }[] }
    bulleted_list_item: { text: [] }
    image: { file: { url: string } }
  }[]
  const mapping = results.map((v, i) => {
    switch (v.type) {
      case 'paragraph':
        return Paragraph({
          blockProps: {
            parentId: v.id,
            text: v.paragraph.text,
          },
          fontSize: ['sm', 'md'],
          fontWeight: 'normal',
        })
      case 'heading_1':
        return (
          <H1
            key={`heading_1-${i}`}
            blockProps={{ parentId: v.id, text: v.heading_1.text }}
          />
        )
      case 'heading_2':
        return (
          <H2
            key={`heading_2-${i}`}
            blockProps={{ parentId: v.id, text: v.heading_2.text }}
          />
        )
      case 'heading_3':
        return (
          <H3
            key={`heading_3-${i}`}
            blockProps={{ parentId: v.id, text: v.heading_3.text }}
          />
        )
      case 'code':
        const code = v.code.text[0].plain_text
        return <CodeBlock key={`code-${i}`} text={code} />
      case 'bulleted_list_item':
        return (
          <BulletedListItem
            key={`bulleted_list_item-${i}`}
            blockProps={{ parentId: v.id, text: v.bulleted_list_item.text }}
          />
        )
      case 'image':
        return <ImageBlock key={`image-${i}`} url={v.image.file.url} />
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
      <Flex marginTop={[2, 4]} width="full" direction="column">
        <Box marginX={[2, 16]}>
          <AspectRatio ratio={[2 / 1, 4 / 1]} backgroundColor="transparent">
            <Image shadow="2xl" rounded="lg" src={coverUrl} />
          </AspectRatio>
          <Box position="relative" left={['2', '4']} bottom={[5, 10]}>
            <LinkIconButton href="/" icon={faHome} />
          </Box>
        </Box>
        <Center marginBottom="12">
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
        <Box marginX={[4, 24]}>{body}</Box>
      </Flex>
    </>
  )
}

export default ArticlePage
