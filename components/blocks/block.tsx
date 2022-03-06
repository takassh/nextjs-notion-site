import {
  BlockObjectResponse,
  PartialBlockObjectResponse,
} from '../../types/api-endpoints'
import { BulletedListItem } from './bulleted_list_item'
import { CodeBlock } from './code'
import { H1 } from './h1'
import { H2 } from './h2'
import { H3 } from './h3'
import { ImageBlock } from './image'
import { NumberedListItem } from './numbered_list_item'
import { Paragraph } from './paragraph'
import { ToggleBlock } from './toggle'

export const Block: (
  blockObjectResponse: (PartialBlockObjectResponse | BlockObjectResponse)[],
) => (JSX.Element | undefined)[] = (blockObjectResponse) => {
  let numberListCounter = 0
  const mapping = blockObjectResponse.map((v, i) => {
    if ('type' in v) {
      switch (v.type) {
        case 'paragraph':
          numberListCounter = 0
          return Paragraph({
            id: v.id,
            text: v.paragraph.text,
            fontSize: ['sm', 'md'],
            fontWeight: 'normal',
          })
        case 'heading_1':
          numberListCounter = 0
          return <H1 key={`heading_1-${i}`} id={v.id} text={v.heading_1.text} />
        case 'heading_2':
          numberListCounter = 0
          return <H2 key={`heading_2-${i}`} id={v.id} text={v.heading_2.text} />
        case 'heading_3':
          numberListCounter = 0
          return <H3 key={`heading_3-${i}`} id={v.id} text={v.heading_3.text} />
        case 'bulleted_list_item':
          numberListCounter = 0
          return (
            <BulletedListItem
              key={`bulleted_list_item-${i}`}
              id={v.id}
              text={v.bulleted_list_item.text}
              hasChildren={v.has_children}
            />
          )
        case 'numbered_list_item':
          numberListCounter += 1
          return (
            <NumberedListItem
              key={`numbered_list_item-${i}`}
              id={v.id}
              text={v.numbered_list_item.text}
              number={numberListCounter}
            />
          )
        case 'code':
          numberListCounter = 0
          const code = v.code.text[0].plain_text
          return <CodeBlock key={`code-${i}`} text={code} />
        case 'image':
          numberListCounter = 0
          switch (v.image.type) {
            case 'file':
              return <ImageBlock key={`image-${i}`} url={v.image.file.url} />
            case 'external':
              return (
                <ImageBlock key={`image-${i}`} url={v.image.external.url} />
              )
          }
        case 'toggle':
          numberListCounter = 0
          return (
            <ToggleBlock key={`toggle-${i}`} id={v.id} text={v.toggle.text} />
          )
      }
    } else {
      return
    }
  })

  return mapping.flat()
}
