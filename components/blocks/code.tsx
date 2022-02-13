import { Code } from '@chakra-ui/react'
import { VFC } from 'react'

export const CodeBlock: VFC<{ text: string }> = ({ text }) => {
  return (
    <Code
      rounded="md"
      fontSize={['xs', 'sm']}
      width="full"
      marginY={['0', '2']}
      padding={['2', '4']}
      whiteSpace="pre">
      {text}
    </Code>
  )
}
