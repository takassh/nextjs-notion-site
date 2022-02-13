import { Box, Center, Image } from '@chakra-ui/react'
import { VFC } from 'react'

export const ImageBlock: VFC<{ url: string }> = ({ url }) => {
  return (
    <Center>
      <Box maxWidth="full">
        <Image rounded="lg" src={url} />
      </Box>
    </Center>
  )
}
