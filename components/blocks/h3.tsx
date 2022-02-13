import { Box } from '@chakra-ui/react'
import { FC } from 'react'
import BlockProps from './block_props'
import { Paragraph } from './paragraph'

export const H3: FC<{ blockProps: BlockProps }> = ({ blockProps }) => {
  return (
    <Box marginY="1" isTruncated>
      {Paragraph({
        blockProps: blockProps,
        fontSize: 'lg',
        fontWeight: 'bold',
      })}
    </Box>
  )
}
