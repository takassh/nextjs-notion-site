import { Box, Divider, Flex, Icon, Text, useColorMode } from '@chakra-ui/react'
import { VFC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'

export const Footer: VFC = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex align="center" width="full" direction="column">
      <Divider />
      <Flex align="center" direction="row" m={4}>
        <Text fontSize="14px">©︎ 2022 Takashi Kasai</Text>
        <Box onClick={toggleColorMode} marginLeft="4">
          <Icon
            fontSize="14px"
            as={FontAwesomeIcon}
            icon={colorMode == 'light' ? faMoon : faSun}
          />
        </Box>
      </Flex>
    </Flex>
  )
}
