import { Box, Center, Icon, Spinner, useColorMode } from '@chakra-ui/react'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, VFC } from 'react'

export const IconButton: VFC<{
  icon: IconDefinition
  onClick?: () => Promise<void>
}> = ({ icon, onClick }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { colorMode } = useColorMode()
  return !isLoading ? (
    <Icon
      onClick={async () => {
        setIsLoading(true)
        if (onClick != null) {
          await onClick()
        }
        setIsLoading(false)
      }}
      borderRadius="40%"
      _hover={{ shadow: 'lg', cursor: 'pointer' }}
      padding={['2', '3']}
      fontSize={['4xl', '5xl']}
      as={FontAwesomeIcon}
      icon={icon}
      color={colorMode == 'light' ? 'black' : 'white'}
      backgroundColor={colorMode == 'light' ? 'white' : 'black'}
    />
  ) : (
    <Box
      position="relative"
      height={['52px', '72px']}
      width={['52px', '72px']}
      borderRadius="40%"
      backgroundColor={colorMode == 'light' ? 'white' : 'black'}>
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translateY(-50%) translateX(-50%)">
        <Center>
          <Spinner color={colorMode == 'light' ? 'black' : 'white'} />
        </Center>
      </Box>
    </Box>
  )
}
