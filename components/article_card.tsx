import {
  AspectRatio,
  Badge,
  Box,
  Center,
  Flex,
  Icon,
  Image,
  Link,
  Spinner,
  Text,
  useColorMode,
} from '@chakra-ui/react'
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'extensions/date'
import NextLink from 'next/link'
import { useState, VFC } from 'react'

type Props = {
  id: string
  createdTime: string
  coverUrl: string
  name: string
  isLiked: boolean
  likedCount: number
  status: string
}

export const ArticleCard: VFC<Props> = ({
  id,
  name,
  createdTime,
  coverUrl,
  isLiked,
  likedCount,
  status,
}) => {
  const [isLoading, setLoading] = useState<boolean>(false)
  const { colorMode } = useColorMode()

  const date = new Date(createdTime)
  const now = Date.now()
  const diffTime = now - date.getTime()
  const diffDay = diffTime / (1000 * 3600 * 24)
  const isNew = diffDay <= 7

  return (
    <NextLink href={`/articles/${id}`} passHref>
      <Link onClick={() => setLoading(true)} style={{ textDecoration: 'none' }}>
        <Box
          shadow={['md', 'none']}
          _hover={{ shadow: 'md' }}
          marginY={['1', 0]}
          maxW={['', 'xs']}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          position="relative">
          <AspectRatio
            maxW={['', 'xs']}
            width={['calc(100vw - 2rem)', '']}
            ratio={2 / 1}
            backgroundColor="transparent">
            <Image src={coverUrl} />
          </AspectRatio>
          <Box p={['4']}>
            <Flex alignItems="center" marginBottom="2">
              {isNew && (
                <Badge borderRadius="full" px="2" marginRight="1">
                  New
                </Badge>
              )}
              {status != 'done' && (
                <Badge borderRadius="full" px="2" marginRight="1">
                  {status}
                </Badge>
              )}
              <Flex justify="center" align="center" marginX="1">
                <Icon
                  fontSize={['xs', 'xs']}
                  as={FontAwesomeIcon}
                  icon={likedCount > 0 ? faSolidHeart : faRegularHeart}
                  color={isLiked ? 'red' : ''}
                />
                {likedCount > 0 && (
                  <Text fontSize={['xs', 'xs']} marginLeft="1">
                    {likedCount}
                  </Text>
                )}
              </Flex>
              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs">
                {date.dateTimeBefore()}
              </Box>
            </Flex>
            <Box
              marginX="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated>
              {name}
            </Box>
          </Box>
          {isLoading && (
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translateY(-50%) translateX(-50%)"
              backgroundColor={colorMode == 'light' ? 'white' : 'black'}
              padding="2"
              rounded="lg"
              opacity="0.4">
              <Center>
                <Spinner />
              </Center>
            </Box>
          )}
        </Box>
      </Link>
    </NextLink>
  )
}
