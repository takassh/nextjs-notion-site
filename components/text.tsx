import {
  Box,
  Code,
  Heading,
  ListItem,
  Text,
  UnorderedList,
  useColorMode,
} from '@chakra-ui/react'
import { VFC } from 'react'

export const H1: VFC<{ text: string }> = ({ text }) => {
  return (
    <Heading marginY="3" as="h1" size="xl" isTruncated>
      {text}
    </Heading>
  )
}

export const H2: VFC<{ text: string }> = ({ text }) => {
  return (
    <Heading marginY="2" as="h2" size="xl" isTruncated>
      {text}
    </Heading>
  )
}

export const H3: VFC<{ text: string }> = ({ text }) => {
  return (
    <Heading marginY="1" as="h3" size="lg" isTruncated>
      {text}
    </Heading>
  )
}

export const NormalText: VFC<{ text: string }> = ({ text }) => {
  return (
    <Text as="span" fontSize="md">
      {text}
    </Text>
  )
}

export const Bold: VFC<{ text: string }> = ({ text }) => {
  return (
    <Text as="span" fontSize="md" fontWeight="bold">
      {text}
    </Text>
  )
}

export const BulletedListItem: VFC<{ text: string }> = ({ text }) => {
  return (
    <UnorderedList paddingX="2" paddingY="1" fontSize="md">
      <ListItem>{text}</ListItem>
    </UnorderedList>
  )
}

export const InlineCode: VFC<{ text: string }> = ({ text }) => {
  const { colorMode } = useColorMode()
  return (
    <Text
      rounded="sm"
      as="span"
      backgroundColor={colorMode == 'light' ? 'gray.100' : 'gray.700'}
      padding="1"
      fontSize="md">
      {text}
    </Text>
  )
}

export const CodeBlock: VFC<{ text: string }> = ({ text }) => {
  return (
    <Code
      rounded="md"
      fontSize="sm"
      width="full"
      marginY="2"
      padding="4"
      whiteSpace="pre">
      {text}
    </Code>
  )
}

export const EmptyBlock: VFC = () => {
  return <Box padding="4" />
}
