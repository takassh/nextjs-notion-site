import {
  AspectRatio,
  Badge,
  Box,
  Flex,
  Icon,
  Image,
  Link,
  Spinner,
  Text,
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
}

export const ArticleCard: VFC<Props> = ({
  id,
  name,
  createdTime,
  coverUrl,
  isLiked,
  likedCount,
}) => {
  const [isLoading, setLoading] = useState<boolean>(false)

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
          maxW={['', '2xs']}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          position="relative">
          <AspectRatio
            maxW={['', '2xs']}
            width={['calc(100vw - 2rem)', '']}
            ratio={2 / 1}
            backgroundColor="transparent">
            <Image src={coverUrl} />
          </AspectRatio>
          <Box p={['4', '5']}>
            <Flex alignItems="center" marginBottom="1">
              {isNew && (
                <Badge borderRadius="full" px="2">
                  New
                </Badge>
              )}
              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
                marginX="1">
                {date.dateTimeBefore()}
              </Box>

              <Flex justify="center" align="center">
                <Icon
                  marginX="1"
                  fontSize={['xs', 'xs']}
                  as={FontAwesomeIcon}
                  icon={likedCount > 0 ? faSolidHeart : faRegularHeart}
                  color={isLiked ? 'red' : ''}
                />
                {likedCount > 0 && (
                  <Text fontSize={['xs', 'xs']}>{likedCount}</Text>
                )}
              </Flex>
            </Flex>
            <Box
              mx="1"
              mt="1"
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
              transform="translateY(-50%) translateX(-50%)">
              <Spinner />
            </Box>
          )}
        </Box>
      </Link>
    </NextLink>
  )
}
