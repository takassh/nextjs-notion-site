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
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              {Paragraph({
                id: id,
                text: text,
                fontSize: ['sm', 'md'],
                fontWeight: 'normal',
              })}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel>
          {error || !data ? (
            <Center>
              <Spinner />
            </Center>
          ) : (
            <Box marginX={[2, 12]}>{Block(data.results)}</Box>
          )}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
