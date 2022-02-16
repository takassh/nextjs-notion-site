import { AspectRatio, Badge, Box, Image } from '@chakra-ui/react'
import 'extensions/date'
import { VFC } from 'react'

type Props = {
  createdTime: string
  coverUrl: string
  name: string
}

export const Card: VFC<Props> = ({ name, createdTime, coverUrl }) => {
  const date = new Date(createdTime)
  const now = Date.now()
  const diffTime = now - date.getTime()
  const diffDay = diffTime / (1000 * 3600 * 24)
  const isNew = diffDay <= 7
  return (
    <Box
      shadow={['md', 'none']}
      _hover={{ shadow: 'md' }}
      marginY={['1', 0]}
      maxW={['', '2xs']}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden">
      <AspectRatio
        maxW={['', '2xs']}
        width={['calc(100vw - 2rem)', '']}
        ratio={2 / 1}
        backgroundColor="transparent">
        <Image src={coverUrl} />
      </AspectRatio>
      <Box p={['4', '5']}>
        <Box display="flex" alignItems="baseline">
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
            ml="2">
            {date.formattedDateTime()}
          </Box>
        </Box>
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
    </Box>
  )
}
