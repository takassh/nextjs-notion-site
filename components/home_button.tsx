import { Icon, Link, useColorMode } from '@chakra-ui/react'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NextLink from 'next/link'
import { VFC } from 'react'

export const HomeButton: VFC = () => {
  const { colorMode } = useColorMode()

  return (
    <NextLink href="/" passHref>
      <Link style={{ textDecoration: 'none' }}>
        <Icon
          _hover={{ shadow: 'lg' }}
          rounded="full"
          padding="4"
          fontSize={['xl', '4xl']}
          as={FontAwesomeIcon}
          icon={faHome}
          color={colorMode == 'light' ? 'black' : 'white'}
          backgroundColor={colorMode == 'light' ? 'white' : 'black'}
        />
      </Link>
    </NextLink>
  )
}
