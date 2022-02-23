import {
  AspectRatio,
  Box,
  Button,
  Center,
  Flex,
  Image,
  Link,
  Spacer,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'
import { useUserStatus } from 'hooks/useUserStatus'
import type { NextPage } from 'next'
import Head from 'next/head'
import NextLink from 'next/link'
import useSWR from 'swr'
import { ArticleCard } from '../components/article_card'
import { LinkIconButton } from '../components/link_icon_button'

const Home: NextPage = () => {
  const { authenticate, logout, user, relations, isAuthenticated } =
    useUserStatus()
  const username = user?.getUsername()

  const { data, error } = useSWR<QueryDatabaseResponse, Error>(
    '/api/retrive_database/descending_article_pages',
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
              Hello! This site is powered by NextJs, Chakra, Notion and Moralis.
              Github repository is
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
        <Flex marginTop="4" align="center" direction="column">
          {!isAuthenticated ? (
            <Button onClick={() => authenticate()}>
              Authenticate with Metamask
            </Button>
          ) : (
            <>
              <Text fontWeight="semibold" fontSize={['xs', 'sm']}>
                Congrats🎉 Login Completed!
              </Text>
              <Text fontSize={['xs', 'sm']}>Your username is {username}</Text>
              <Button
                marginTop="4"
                onClick={async () => {
                  await logout()
                }}>
                Logout
              </Button>
            </>
          )}
        </Flex>

        <Center marginTop="10" marginBottom="2">
          <Text fontWeight="semibold">Dev Ticket</Text>
        </Center>

        <Center>
          {error || !data ? (
            <Spinner />
          ) : (
            <Tabs>
              <TabList justifyContent="center">
                <Tab fontWeight="semibold" textTransform="uppercase">
                  All
                </Tab>
                <Tab fontWeight="semibold" textTransform="uppercase">
                  Done
                </Tab>
                <Tab fontWeight="semibold" textTransform="uppercase">
                  In Progress
                </Tab>
                <Tab fontWeight="semibold" textTransform="uppercase">
                  Article
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel width="100vw">
                  <Wrap spacing={[0, '0.5rem']} justify="center">
                    {data.results.map((v: any) => (
                      <WrapItem key={v.id}>
                        <ArticleCard
                          id={v.id}
                          status={v.properties.status.select.name}
                          likedCount={v.properties.users.relation.length}
                          isLiked={
                            relations?.find(
                              (relation) => relation.id == v.id,
                            ) != undefined
                          }
                          name={v.properties.name.title[0].plain_text}
                          createdTime={v.created_time}
                          coverUrl={
                            v.cover?.external?.url ?? v.cover?.file?.url
                          }
                        />
                      </WrapItem>
                    ))}
                  </Wrap>
                </TabPanel>
                <TabPanel width="100vw">
                  <Wrap spacing={[0, '0.5rem']} justify="center">
                    {data.results
                      .filter(
                        (v: any) => v.properties.status.select.name == 'done',
                      )
                      .map((v: any) => (
                        <WrapItem key={v.id}>
                          <ArticleCard
                            id={v.id}
                            status={v.properties.status.select.name}
                            likedCount={v.properties.users.relation.length}
                            isLiked={
                              relations?.find(
                                (relation) => relation.id == v.id,
                              ) != undefined
                            }
                            name={v.properties.name.title[0].plain_text}
                            createdTime={v.created_time}
                            coverUrl={
                              v.cover?.external?.url ?? v.cover?.file?.url
                            }
                          />
                        </WrapItem>
                      ))}
                  </Wrap>
                </TabPanel>
                <TabPanel width="100vw">
                  <Wrap spacing={[0, '0.5rem']} justify="center">
                    {data.results
                      .filter(
                        (v: any) =>
                          v.properties.status.select.name == 'in progress',
                      )
                      .map((v: any) => (
                        <WrapItem key={v.id}>
                          <ArticleCard
                            id={v.id}
                            status={v.properties.status.select.name}
                            likedCount={v.properties.users.relation.length}
                            isLiked={
                              relations?.find(
                                (relation) => relation.id == v.id,
                              ) != undefined
                            }
                            name={v.properties.name.title[0].plain_text}
                            createdTime={v.created_time}
                            coverUrl={
                              v.cover?.external?.url ?? v.cover?.file?.url
                            }
                          />
                        </WrapItem>
                      ))}
                  </Wrap>
                </TabPanel>
                <TabPanel width="100vw">
                  <Wrap spacing={[0, '0.5rem']} justify="center">
                    {data.results
                      .filter(
                        (v: any) =>
                          v.properties.status.select.name == 'article',
                      )
                      .map((v: any) => (
                        <WrapItem key={v.id}>
                          <ArticleCard
                            id={v.id}
                            status={v.properties.status.select.name}
                            likedCount={v.properties.users.relation.length}
                            isLiked={
                              relations?.find(
                                (relation) => relation.id == v.id,
                              ) != undefined
                            }
                            name={v.properties.name.title[0].plain_text}
                            createdTime={v.created_time}
                            coverUrl={
                              v.cover?.external?.url ?? v.cover?.file?.url
                            }
                          />
                        </WrapItem>
                      ))}
                  </Wrap>
                </TabPanel>
              </TabPanels>
            </Tabs>
          )}
        </Center>
      </Flex>
    </>
  )
}

export default Home
