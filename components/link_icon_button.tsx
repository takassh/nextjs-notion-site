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
          borderRadius="40%"
          _hover={{ shadow: 'lg' }}
          padding={['2', '3']}
          fontSize={['4xl', '5xl']}
          as={FontAwesomeIcon}
          icon={icon}
          color={colorMode == 'light' ? 'black' : 'white'}
          backgroundColor={colorMode == 'light' ? 'white' : 'black'}
        />
      </Link>
    </NextLink>
  )
}
