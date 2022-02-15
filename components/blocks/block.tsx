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
import { Paragraph } from './paragraph'
import { ToggleBlock } from './toggle'

export const Block: (
  blockObjectResponse: (PartialBlockObjectResponse | BlockObjectResponse)[],
) => (JSX.Element | undefined)[] = (blockObjectResponse) => {
  const mapping = blockObjectResponse.map((v, i) => {
    if ('type' in v) {
      switch (v.type) {
        case 'paragraph':
          return Paragraph({
            id: v.id,
            text: v.paragraph.text,
            fontSize: ['sm', 'md'],
            fontWeight: 'normal',
          })
        case 'heading_1':
          return <H1 key={`heading_1-${i}`} id={v.id} text={v.heading_1.text} />
        case 'heading_2':
          return <H2 key={`heading_2-${i}`} id={v.id} text={v.heading_2.text} />
        case 'heading_3':
          return <H3 key={`heading_3-${i}`} id={v.id} text={v.heading_3.text} />
        case 'bulleted_list_item':
          return (
            <BulletedListItem
              key={`bulleted_list_item-${i}`}
              id={v.id}
              text={v.bulleted_list_item.text}
            />
          )
        case 'code':
          const code = v.code.text[0].plain_text
          return <CodeBlock key={`code-${i}`} text={code} />
        case 'image':
          switch (v.image.type) {
            case 'file':
              return <ImageBlock key={`image-${i}`} url={v.image.file.url} />
            case 'external':
              return (
                <ImageBlock key={`image-${i}`} url={v.image.external.url} />
              )
          }
        case 'toggle':
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
