import { Text } from '@chakra-ui/react'
import { VFC } from 'react'
import { InlineLink } from './inline_link'

export const InlineStrikethrough: VFC<{
  text: string
  href: string | null
  fontSize: string[] | string
  fontWeight: string[] | string
}> = ({ text, href, fontSize, fontWeight }) => {
  const child = (
    <Text as="s" fontSize={fontSize} fontWeight={fontWeight}>
      {text}
    </Text>
  )
  if (href == null) {
    return child
  } else {
    return <InlineLink href={href}>{child}</InlineLink>
  }
}
