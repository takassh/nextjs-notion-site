import { Box, Center, ListItem, Spinner, UnorderedList } from '@chakra-ui/react'
import { FC } from 'react'
import useSWR from 'swr'
import { RichTextItemResponse } from '../../types/api-endpoints'
import { Block } from './block'
import { Paragraph } from './paragraph'

export const BulletedListItem: FC<{
  id: string
  text: RichTextItemResponse[]
  hasChildren: boolean
}> = ({ id, text, hasChildren }) => {
  const { data, error } = useSWR<any, Error>(
    `/api/retrive_page_blocks/${id}`,
    (url) => fetch(url).then((r) => r.json()),
  )
  if (hasChildren) {
    if (error || !data) {
      return (
        <Center>
          <Spinner />
        </Center>
      )
    }
    return (
      <UnorderedList paddingX="2" paddingY={['0.5', '1']}>
        <ListItem>
          {Paragraph({
            id: id,
            text: text,
            fontSize: ['sm', 'md'],
            fontWeight: 'normal',
          })}
        </ListItem>
        <Box marginLeft="xs">{Block(data.results)}</Box>
      </UnorderedList>
    )
  } else {
    return (
      <UnorderedList paddingX="2" paddingY={['0.5', '1']}>
        <ListItem>
          {Paragraph({
            id: id,
            text: text,
            fontSize: ['sm', 'md'],
            fontWeight: 'normal',
          })}
        </ListItem>
      </UnorderedList>
    )
  }
}
