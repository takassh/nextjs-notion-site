import { Client } from '@notionhq/client'
import { GetPageResponse } from '@notionhq/client/build/src/api-endpoints'
import { NextApiRequest, NextApiResponse } from 'next'

//refer to https://developers.notion.com/reference/post-database-query-filter
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const LikeArticle: (
  req: NextApiRequest,
  res: NextApiResponse<GetPageResponse>,
) => Promise<void> = async (req, res) => {
  const { articlePageId, userPageId } = req.query

  const userPage = (await notion.pages.retrieve({
    page_id: userPageId as string,
  })) as any

  const relations = userPage.properties.articles.relation as Array<{
    id: string
  }>

  const newRelations = [...relations, { id: articlePageId as string }]

  const result = await notion.pages.update({
    page_id: userPageId as string,
    properties: {
      articles: {
        relation: newRelations,
      },
    },
  })

  const response = result as GetPageResponse
  res.status(200).json(response)
}

export default LikeArticle
