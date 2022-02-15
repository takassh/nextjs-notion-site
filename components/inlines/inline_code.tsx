import { Text, useColorMode } from '@chakra-ui/react'
import { FC } from 'react'
import { InlineLink } from './inline_link'

export const InlineCode: FC<{ href: string | null }> = ({ children, href }) => {
  const { colorMode } = useColorMode()
  const child = (
    <Text
      rounded="sm"
      as="span"
      backgroundColor={colorMode == 'light' ? 'gray.100' : 'gray.700'}
      padding="1"
      fontSize="sm">
      {children}
    </Text>
  )

  if (href == null) {
    return child
  } else {
    return <InlineLink href={href}>{child}</InlineLink>
  }
}
