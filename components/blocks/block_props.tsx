type BlockProps = {
  parentId: string
  text: {
    text: { content: string; link: string }
    annotations: {
      bold: boolean
      italic: boolean
      strikethrough: boolean
      underline: boolean
      code: boolean
      color: 'default'
    }
    plain_text: string
    href: string
  }[]
}

export default BlockProps
