import { Icon, Link, useColorMode } from '@chakra-ui/react'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NextLink from 'next/link'
import { VFC } from 'react'

export const LinkIconButton: VFC<{ icon: IconDefinition; href: string }> = ({
  icon,
  href,
}) => {
  const { colorMode } = useColorMode()
  return (
    <NextLink href={href} passHref>
      <Link style={{ textDecoration: 'none' }}>
        <Icon
          _hover={{ shadow: 'lg' }}
          rounded="full"
          padding={['2', '4']}
          fontSize={['xl', '4xl']}
          as={FontAwesomeIcon}
          icon={icon}
          color={colorMode == 'light' ? 'black' : 'white'}
          backgroundColor={colorMode == 'light' ? 'white' : 'black'}
        />
      </Link>
    </NextLink>
  )
}
