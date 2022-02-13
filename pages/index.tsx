import {
  AspectRatio,
  Box,
  Center,
  Divider,
  Flex,
  Image,
  Link,
  Spacer,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import NextLink from 'next/link'
import { RetriveDatabaseDescendingPages } from '../api/api'
import { Card } from '../components/card'
import { LinkIconButton } from '../components/link_icon_button'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await RetriveDatabaseDescendingPages()
  return {
    props: {
      response,
    },
  }
}

type Props = {
  response: QueryDatabaseResponse
}

const Home: NextPage<Props> = (props) => {
  const databaseResponseResults = props.response.results
  return (
    <>
      <Head>
        <meta property="og:title" content="Takassh Blog" />
        <meta
          property="og:image"
          content="https://nextjs-notion-site.vercel.app/colorful.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Flex marginTop={[2, 4]} width="full" direction="column">
        <Box marginX={[2, 16]}>
          <AspectRatio ratio={[2 / 1, 4 / 1]} backgroundColor="transparent">
            <Image shadow="2xl" rounded="lg" src="/colorful.jpg" />
          </AspectRatio>
          <Flex
            justifyContent="center"
            align="center"
            position="relative"
            bottom={[8, 16]}>
            <Spacer />
            <LinkIconButton href="https://github.com/takassh" icon={faGithub} />
            <Spacer />
            <Image
              shadow="2xl"
              boxSize={[14, 28]}
              borderRadius="full"
              src="/fireworks.JPG"
            />
            <Spacer />
            <LinkIconButton
              href="https://twitter.com/octozuki"
              icon={faTwitter}
            />
            <Spacer />
          </Flex>
        </Box>

        <Center>
          <Box marginX={['2', '10']}>
            <Text as="span" fontWeight="semibold" fontSize={['xs', 'sm']}>
              Hello! This site is powered by NextJs and Notion. Github
              repository is
            </Text>
            <Text as="span"> </Text>
            <Text as="u" fontWeight="semibold" fontSize={['xs', 'sm']}>
              <NextLink
                href="https://github.com/takassh/nextjs-notion-site"
                passHref>
                <Link>here.</Link>
              </NextLink>
            </Text>
          </Box>
        </Center>

        <Divider marginY="5" />
        <Center marginBottom="5">
          <Text fontWeight="bold">Blog</Text>
        </Center>
        <Center>
          <Wrap marginX={[2, 24]}>
            {databaseResponseResults.map((v: any) => {
              return (
                <WrapItem key={v.id}>
                  <NextLink href={`/articles/${v.id}`} passHref>
                    <Link style={{ textDecoration: 'none' }}>
                      <Card
                        name={v.properties.name.title[0].plain_text}
                        createdTime={v.created_time}
                        coverUrl={v.cover?.external.url}
                        linkUrl=""
                        lastEditedTime=""
                      />
                    </Link>
                  </NextLink>
                </WrapItem>
              )
            })}
          </Wrap>
        </Center>
      </Flex>
    </>
  )
}

export default Home
