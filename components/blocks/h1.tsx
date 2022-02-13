import { Box } from '@chakra-ui/react'
import { FC } from 'react'
import BlockProps from './block_props'
import { Paragraph } from './paragraph'

export const H1: FC<{ blockProps: BlockProps }> = ({ blockProps }) => {
  return (
    <Box marginY="2" isTruncated>
      {Paragraph({
        blockProps: blockProps,
        fontSize: '3xl',
        fontWeight: 'bold',
      })}
    </Box>
  )
}
