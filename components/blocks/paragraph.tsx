import { RichTextItemResponse } from '../../types/api-endpoints'
import { InlineCode } from '../inlines/inline_code'
import { InlineItalic } from '../inlines/inline_italic'
import { InlineStrikethrough } from '../inlines/inline_strikethrough'
import { InlineText } from '../inlines/inline_text'
import { InlineUnderline } from '../inlines/inline_underline'
import { EmptyBlock } from './empty'

export type ParagraphProps = {
  id: string
  text: RichTextItemResponse[]
  fontSize: string[] | string
  fontWeight: string[] | string
}

export const Paragraph: ({
  id,
  text,
  fontSize,
  fontWeight,
}: ParagraphProps) => JSX.Element[] = ({ id, text, fontSize, fontWeight }) => {
  if (text.length != 0) {
    return text
      .map((v, i) => {
        let child = <></>

        if (v.annotations.bold) {
          child = (
            <InlineText
              key={`bold-${i}`}
              href={v.href}
              fontSize={fontSize}
              fontWeight="bold">
              {v.plain_text}
            </InlineText>
          )
        } else {
          child = (
            <InlineText
              key={`normal-${i}`}
              href={v.href}
              fontSize={fontSize}
              fontWeight={fontWeight}>
              {v.plain_text}
            </InlineText>
          )
        }

        if (v.annotations.italic) {
          child = (
            <InlineItalic
              key={`italic-${i}`}
              href={v.href}
              fontSize={fontSize}
              fontWeight={fontWeight}>
              {child}
            </InlineItalic>
          )
        }
        if (v.annotations.strikethrough) {
          child = (
            <InlineStrikethrough
              key={`strikethrough-${i}`}
              href={v.href}
              fontSize={fontSize}
              fontWeight={fontWeight}>
              {child}
            </InlineStrikethrough>
          )
        }
        if (v.annotations.underline) {
          child = (
            <InlineUnderline
              key={`underline-${i}`}
              href={v.href}
              fontSize={fontSize}
              fontWeight={fontWeight}>
              {child}
            </InlineUnderline>
          )
        }
        if (v.annotations.code) {
          child = (
            <InlineCode key={`inline-code-${i}`} href={v.href}>
              {child}
            </InlineCode>
          )
        }

        return child
      })
      .flat()
  } else {
    return [<EmptyBlock key={`empty-${id}`} />]
  }
}
