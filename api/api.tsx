import { Client } from '@notionhq/client'
import {
  GetDatabaseResponse,
  GetPageResponse,
  ListBlockChildrenResponse,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints'

//refer to https://developers.notion.com/reference/post-database-query-filter
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

export const RetriveDatabase: (
  databaseId: string,
) => Promise<GetDatabaseResponse> = async (databaseId) => {
  const result = await notion.databases.retrieve({
    database_id: databaseId,
  })

  return result
}

export const RetriveDatabaseDescendingPages: () => Promise<QueryDatabaseResponse> =
  async () => {
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

    return result
  }

export const RetrivePage: (pageId: string) => Promise<GetPageResponse> = async (
  pageId,
) => {
  const result = await notion.pages.retrieve({
    page_id: pageId,
  })

  return result
}

export const RetrivePageBlocks: (
  pageId: string,
) => Promise<ListBlockChildrenResponse> = async (pageId) => {
  const result = await notion.blocks.children.list({
    block_id: pageId,
  })

  return result
}
