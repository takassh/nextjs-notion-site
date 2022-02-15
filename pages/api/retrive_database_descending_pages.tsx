import { Client } from '@notionhq/client'
import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'
import { NextApiRequest, NextApiResponse } from 'next'

//refer to https://developers.notion.com/reference/post-database-query-filter
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const RetriveDatabaseDescendingPages: (
  req: NextApiRequest,
  res: NextApiResponse<QueryDatabaseResponse>,
) => Promise<void> = async (req, res) => {
  const result = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID as string,
    filter: {
      and: [
        {
          property: 'release',
          checkbox: {
            equals: true,
          },
        },
      ],
    },
    sorts: [
      {
        timestamp: 'created_time',
        direction: 'descending',
      },
    ],
  })

  res.status(200).json(result)
}

export default RetriveDatabaseDescendingPages
