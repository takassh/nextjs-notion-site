import { Client } from '@notionhq/client'
import { GetPageResponse } from '@notionhq/client/build/src/api-endpoints'
import { NextApiRequest, NextApiResponse } from 'next'

//refer to https://developers.notion.com/reference/post-database-query-filter
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const RetrivePage: (
  req: NextApiRequest,
  res: NextApiResponse<GetPageResponse>,
) => Promise<void> = async (req, res) => {
  const { pageId } = req.query
  if (pageId == 'undefined') {
    res.status(404)
  } else {
    const result = await notion.pages.retrieve({
      page_id: pageId as string,
    })

    res.status(200).json(result)
  }
}

export default RetrivePage
