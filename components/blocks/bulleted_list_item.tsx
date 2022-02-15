import { ListItem, UnorderedList } from '@chakra-ui/react'
import { FC } from 'react'
import { RichTextItemResponse } from '../../types/api-endpoints'
import { Paragraph } from './paragraph'

export const BulletedListItem: FC<{
  id: string
  text: RichTextItemResponse[]
}> = ({ id, text }) => {
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
