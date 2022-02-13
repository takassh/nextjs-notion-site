import { ListItem, UnorderedList } from '@chakra-ui/react'
import { FC } from 'react'
import BlockProps from './block_props'
import { Paragraph } from './paragraph'

export const BulletedListItem: FC<{ blockProps: BlockProps }> = ({
  blockProps,
}) => {
  return (
    <UnorderedList paddingX="2" paddingY={['0.5', '1']}>
      <ListItem>
        {Paragraph({
          blockProps: blockProps,
          fontSize: ['sm', 'md'],
          fontWeight: 'normal',
        })}
      </ListItem>
    </UnorderedList>
  )
}
