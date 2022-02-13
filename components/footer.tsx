import { Box, Divider, Flex, Icon, Text, useColorMode } from '@chakra-ui/react'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { VFC } from 'react'

export const Footer: VFC = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex align="center" width="full" direction="column">
      <Divider />
      <Flex align="center" direction="row" m={4}>
        <Text fontSize={['xs', 'md']}>©︎ 2022 Takashi Kasai</Text>
        <Box onClick={toggleColorMode} marginLeft="4">
          <Icon
            fontSize={['sm', 'md']}
            as={FontAwesomeIcon}
            icon={colorMode == 'light' ? faMoon : faSun}
          />
        </Box>
      </Flex>
    </Flex>
  )
}
