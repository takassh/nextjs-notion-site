import { Box } from '@chakra-ui/react'
import { FC } from 'react'
import BlockProps from './block_props'
import { Paragraph } from './paragraph'

export const H2: FC<{ blockProps: BlockProps }> = ({ blockProps }) => {
  return (
    <Box marginY="2" isTruncated>
      {Paragraph({
        blockProps: blockProps,
        fontSize: ['xl', '2xl'],
        fontWeight: 'bold',
      })}
    </Box>
  )
}
