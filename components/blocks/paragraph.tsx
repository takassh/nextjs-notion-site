import { InlineBold } from '../inlines/inline_bold'
import { InlineCode } from '../inlines/inline_code'
import { InlineItalic } from '../inlines/inline_italic'
import { InlineStrikethrough } from '../inlines/inline_strikethrough'
import { InlineText } from '../inlines/inline_text'
import { InlineUnderline } from '../inlines/inline_underline'
import BlockProps from './block_props'
import { EmptyBlock } from './empty'

export type ParagraphProps = {
  blockProps: BlockProps
  fontSize: string[] | string
  fontWeight: string[] | string
}

export const Paragraph: ({
  blockProps,
  fontSize,
  fontWeight,
}: ParagraphProps) => JSX.Element[] = ({
  blockProps,
  fontSize,
  fontWeight,
}) => {
  if (blockProps.text.length != 0) {
    return blockProps.text
      .map((v, i) => {
        if (v.annotations.bold) {
          return (
            <InlineBold
              key={`bold-${i}`}
              text={v.plain_text}
              href={v.href}
              fontSize={fontSize}
            />
          )
        } else if (v.annotations.italic) {
          return (
            <InlineItalic
              key={`italic-${i}`}
              text={v.plain_text}
              href={v.href}
              fontSize={fontSize}
              fontWeight={fontWeight}
            />
          )
        } else if (v.annotations.strikethrough) {
          return (
            <InlineStrikethrough
              key={`strikethrough-${i}`}
              text={v.plain_text}
              href={v.href}
              fontSize={fontSize}
              fontWeight={fontWeight}
            />
          )
        } else if (v.annotations.underline) {
          return (
            <InlineUnderline
              key={`underline-${i}`}
              text={v.plain_text}
              href={v.href}
              fontSize={fontSize}
              fontWeight={fontWeight}
            />
          )
        } else if (v.annotations.code) {
          return (
            <InlineCode
              key={`inline-code-${i}`}
              text={v.plain_text}
              href={v.href}
            />
          )
        }
        return (
          <InlineText
            key={`normal-${i}`}
            text={v.plain_text}
            href={v.href}
            fontSize={fontSize}
            fontWeight={fontWeight}
          />
        )
      })
      .flat()
  } else {
    return [<EmptyBlock key={`empty-${blockProps.parentId}`} />]
  }
}
