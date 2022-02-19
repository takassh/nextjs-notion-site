import { Client } from '@notionhq/client'
import { GetPageResponse } from '@notionhq/client/build/src/api-endpoints'
import { NextApiRequest, NextApiResponse } from 'next'

//refer to https://developers.notion.com/reference/post-database-query-filter
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const GetUserPage: (
  req: NextApiRequest,
  res: NextApiResponse<GetPageResponse>,
) => Promise<void> = async (req, res) => {
  const { userId } = req.query
  const result = await notion.databases.query({
    database_id: process.env.NOTION_USERS_DATABASE_ID as string,
    filter: {
      and: [
        {
          property: 'username',
          text: {
            equals: userId as string,
          },
        },
      ],
    },
  })

  if (result.results.length > 1) {
    result.results.slice(1).every((result) => {
      notion.pages.update({
        page_id: result.id,
        archived: true,
      })
    })
    const response = result.results[0] as GetPageResponse
    res.status(200).json(response)
  } else if (result.results.length == 0) {
    const result = await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_USERS_DATABASE_ID as string,
      },
      properties: {
        username: {
          title: [
            {
              text: {
                content: userId as string,
              },
            },
          ],
        },
      },
    })

    const response = result as GetPageResponse
    res.status(200).json(response)
  } else {
    const response = result.results[0] as GetPageResponse
    res.status(200).json(response)
  }
}

export default GetUserPage
