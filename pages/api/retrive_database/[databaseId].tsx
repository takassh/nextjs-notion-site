import { Client } from '@notionhq/client'
import { GetDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'
import { NextApiRequest, NextApiResponse } from 'next'

//refer to https://developers.notion.com/reference/post-database-query-filter
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const RetriveDatabase: (
  req: NextApiRequest,
  res: NextApiResponse<GetDatabaseResponse>,
) => Promise<void> = async (req, res) => {
  const { databaseId } = req.query
  const result = await notion.databases.retrieve({
    database_id: databaseId as string,
  })

  res.status(200).json(result)
}

export default RetriveDatabase
