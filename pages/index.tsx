import {
  AspectRatio,
  Box,
  Center,
  Divider,
  Flex,
  Image,
  Link,
  Spacer,
  Spinner,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'
import type { NextPage } from 'next'
import Head from 'next/head'
import NextLink from 'next/link'
import useSWR from 'swr'
import { ArticleCard } from '../components/article_card'
import { LinkIconButton } from '../components/link_icon_button'

const Home: NextPage = () => {
  const { data, error } = useSWR<QueryDatabaseResponse, Error>(
    '/api/retrive_database_descending_pages',
    (url) => fetch(url).then((r) => r.json()),
  )

  return (
    <>
      <Head>
        <meta property="og:title" content="Takassh Dev Blog" />
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
          <Flex align="center" position="relative" bottom={[8, 16]}>
            <Spacer />
            <LinkIconButton href="https://github.com/takassh" icon={faGithub} />
            <Spacer />
            <Image
              shadow="2xl"
              boxSize={[16, 28]}
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
          <Box marginX={['4', '10']}>
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
          <Text fontWeight="bold">Dev Blog</Text>
        </Center>
        <Center>
          {error || !data ? (
            <Spinner />
          ) : (
            <Wrap spacing={[0, '0.5rem']} justify="center">
              {data.results.map((v: any) => (
                <WrapItem key={v.id}>
                  <ArticleCard
                    id={v.id}
                    name={v.properties.name.title[0].plain_text}
                    createdTime={v.created_time}
                    coverUrl={v.cover?.external?.url ?? v.cover?.file?.url}
                  />
                </WrapItem>
              ))}
            </Wrap>
          )}
        </Center>
      </Flex>
    </>
  )
}

export default Home
