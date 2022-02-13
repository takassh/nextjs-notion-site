import { Text } from '@chakra-ui/react'
import { VFC } from 'react'
import { InlineLink } from './inline_link'

export const InlineText: VFC<{
  text: string
  href: string
  fontSize: string[] | string
  fontWeight: string[] | string
}> = ({ text, href, fontSize, fontWeight }) => {
  const child = (
    <Text as="span" fontSize={fontSize} fontWeight={fontWeight}>
      {text}
    </Text>
  )
  if (href == null) {
    return child
  } else {
    return <InlineLink href={href}>{child}</InlineLink>
  }
}
