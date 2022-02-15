import { Text } from '@chakra-ui/react'
import { FC } from 'react'
import { InlineLink } from './inline_link'

export const InlineStrikethrough: FC<{
  href: string | null
  fontSize: string[] | string
  fontWeight: string[] | string
}> = ({ children, href, fontSize, fontWeight }) => {
  const child = (
    <Text as="s" fontSize={fontSize} fontWeight={fontWeight}>
      {children}
    </Text>
  )
  if (href == null) {
    return child
  } else {
    return <InlineLink href={href}>{child}</InlineLink>
  }
}
