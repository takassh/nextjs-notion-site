import { Text, useColorMode } from '@chakra-ui/react'
import { VFC } from 'react'
import { InlineLink } from './inline_link'

export const InlineCode: VFC<{ text: string; href: string }> = ({
  text,
  href,
}) => {
  const { colorMode } = useColorMode()
  const child = (
    <Text
      rounded="sm"
      as="span"
      backgroundColor={colorMode == 'light' ? 'gray.100' : 'gray.700'}
      padding="1"
      fontSize="md">
      {text}
    </Text>
  )

  if (href == null) {
    return child
  } else {
    return <InlineLink href={href}>{child}</InlineLink>
  }
}
