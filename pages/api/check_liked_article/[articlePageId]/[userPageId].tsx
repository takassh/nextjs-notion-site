import { Client } from '@notionhq/client'
import { NextApiRequest, NextApiResponse } from 'next'

//refer to https://developers.notion.com/reference/post-database-query-filter
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const CheckLikedArticle: (
  req: NextApiRequest,
  res: NextApiResponse<boolean>,
) => Promise<void> = async (req, res) => {
  const { articlePageId, userPageId } = req.query
  const userPage = (await notion.pages.retrieve({
    page_id: userPageId as string,
  })) as any

  const relations = userPage.properties.articles.relation as Array<{
    id: string
  }>

  const isLiked =
    relations.find((relation) => relation.id == articlePageId) != undefined

  res.status(200).json(isLiked)
}

export default CheckLikedArticle
