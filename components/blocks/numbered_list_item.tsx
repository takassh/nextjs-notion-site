import { ListItem, OrderedList } from '@chakra-ui/react'
import { FC } from 'react'
import { RichTextItemResponse } from '../../types/api-endpoints'
import { Paragraph } from './paragraph'

export const NumberedListItem: FC<{
  id: string
  text: RichTextItemResponse[]
  number: number
}> = ({ id, text, number }) => {
  return (
    <OrderedList start={number} paddingX="2" paddingY={['0.5', '1']}>
      <ListItem>
        {Paragraph({
          id: id,
          text: text,
          fontSize: ['sm', 'md'],
          fontWeight: 'normal',
        })}
      </ListItem>
    </OrderedList>
  )
}
