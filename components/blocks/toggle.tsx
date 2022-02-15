import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Center,
  Spinner,
} from '@chakra-ui/react'
import { FC } from 'react'
import useSWR from 'swr'
import { RichTextItemResponse } from '../../types/api-endpoints'
import { Block } from './block'
import { Paragraph } from './paragraph'

export const ToggleBlock: FC<{
  id: string
  text: RichTextItemResponse[]
}> = ({ id, text }) => {
  const { data, error } = useSWR<any, Error>(
    `/api/retrive_page_blocks/${id}`,
    (url) => fetch(url).then((r) => r.json()),
  )

  return (
    <Accordion allowToggle>
      <AccordionItem style={{ border: 'none' }}>
        <AccordionButton paddingY={2} paddingX={0}>
          <AccordionIcon />
          {Paragraph({
            id: id,
            text: text,
            fontSize: ['sm', 'md'],
            fontWeight: 'normal',
          })}
        </AccordionButton>
        <AccordionPanel>
          {error || !data ? (
            <Center>
              <Spinner />
            </Center>
          ) : (
            <Box>{Block(data.results)}</Box>
          )}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
