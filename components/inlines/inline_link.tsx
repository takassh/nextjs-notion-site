import { Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import { FC } from 'react'

export const InlineLink: FC<{ href: string }> = ({ href, children }) => {
  return (
    <NextLink href={href} passHref>
      <Link color="teal.500">{children}</Link>
    </NextLink>
  )
}
