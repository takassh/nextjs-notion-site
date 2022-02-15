import { Client } from '@notionhq/client'
import { ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints'
import { NextApiRequest, NextApiResponse } from 'next'

//refer to https://developers.notion.com/reference/post-database-query-filter
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const RetrivePageBlocks: (
  req: NextApiRequest,
  res: NextApiResponse<ListBlockChildrenResponse>,
) => Promise<void> = async (req, res) => {
  const { pageId } = req.query
  const result = await notion.blocks.children.list({
    block_id: pageId as string,
  })

  res.status(200).json(result)
}

export default RetrivePageBlocks
