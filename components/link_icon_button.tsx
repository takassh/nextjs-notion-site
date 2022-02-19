import { Link } from '@chakra-ui/react'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import NextLink from 'next/link'
import { VFC } from 'react'
import { IconButton } from './icon_button'

export const LinkIconButton: VFC<{
  icon: IconDefinition
  href: string
}> = ({ icon, href }) => {
  return (
    <NextLink href={href} passHref>
      <Link style={{ textDecoration: 'none' }}>
        <IconButton icon={icon} />
      </Link>
    </NextLink>
  )
}
