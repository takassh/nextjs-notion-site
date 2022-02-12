import {
  AspectRatio,
  Box,
  Center,
  Flex,
  Image,
  Link,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'
import type { GetServerSideProps, NextPage } from 'next'
import NextLink from 'next/link'
import { RetriveDatabaseDescendingPages } from '../api/api'
import { Card } from '../components/card'

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
      <Flex width="full" direction="column">
        <Box marginTop={[2, 4]} marginX={[4, 16]}>
          <AspectRatio ratio={4 / 1} backgroundColor="transparent">
            <Image shadow="2xl" rounded="lg" src="/colorful.jpg" />
          </AspectRatio>
          <Center position="relative" bottom={[5, 16]}>
            <Image
              shadow="2xl"
              boxSize={[10, 28]}
              borderRadius="full"
              src="/fireworks.JPG"
            />
          </Center>
        </Box>
        <Center>
          <Flex direction="column" width="full" maxWidth="1280px">
            <Center marginBottom="12">
              <Text fontWeight="bold" fontSize="32px">
                Takashi Kasai
              </Text>
            </Center>
          </Flex>
        </Center>
        <Center>
          <Wrap marginX={[0, 24]}>
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
