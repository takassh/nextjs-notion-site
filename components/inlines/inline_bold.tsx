import { Text } from '@chakra-ui/react'
import { VFC } from 'react'
import { InlineLink } from './inline_link'

export const InlineBold: VFC<{
  text: string
  href: string
  fontSize: string[] | string
}> = ({ text, href, fontSize }) => {
  const child = (
    <Text as="span" fontSize={fontSize} fontWeight="bold">
      {text}
    </Text>
  )
  if (href == null) {
    return child
  } else {
    return <InlineLink href={href}>{child}</InlineLink>
  }
}
