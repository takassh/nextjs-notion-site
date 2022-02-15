import { Box } from '@chakra-ui/react'
import { FC } from 'react'
import { RichTextItemResponse } from '../../types/api-endpoints'
import { Paragraph } from './paragraph'

export const H3: FC<{
  id: string
  text: RichTextItemResponse[]
}> = ({ id, text }) => {
  return (
    <Box marginY="2" isTruncated>
      {Paragraph({
        id: id,
        text: text,
        fontSize: 'xl',
        fontWeight: 'bold',
      })}
    </Box>
  )
}
