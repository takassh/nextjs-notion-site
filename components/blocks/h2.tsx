import { Box } from '@chakra-ui/react'
import { FC } from 'react'
import { RichTextItemResponse } from '../../types/api-endpoints'
import { Paragraph } from './paragraph'

export const H2: FC<{
  id: string
  text: RichTextItemResponse[]
}> = ({ id, text }) => {
  return (
    <Box marginY="2" isTruncated>
      {Paragraph({
        id: id,
        text: text,
        fontSize: '2xl',
        fontWeight: 'bold',
      })}
    </Box>
  )
}
