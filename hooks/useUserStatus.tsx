import { GetPageResponse } from '@notionhq/client/build/src/api-endpoints'
import { Moralis } from 'moralis/types'
import { useMoralis } from 'react-moralis'
import { AuthenticateOptions } from 'react-moralis/lib/hooks/core/useMoralis/_useMoralisAuth'
import useSWR from 'swr'

export const useUserStatus: () => {
  authenticate: (
    options?: AuthenticateOptions | undefined,
  ) => Promise<Moralis.User<Moralis.Attributes> | undefined>
  logout: () => Promise<void>
  isAuthenticated: boolean
  user: Moralis.User<Moralis.Attributes> | null
  userPageId?: string
  relations?: Array<{ id: string }>
} = () => {
  const { isAuthenticated, user, authenticate, logout } = useMoralis()
  const userResponse = useSWR<GetPageResponse, Error>(
    `/api/get_user_page/${user?.getUsername()}`,
    (url) => fetch(url).then((r) => r.json()),
  )

  let result: {
    authenticate: (
      options?: AuthenticateOptions | undefined,
    ) => Promise<Moralis.User<Moralis.Attributes> | undefined>
    logout: () => Promise<void>
    isAuthenticated: boolean
    user: Moralis.User<Moralis.Attributes> | null
    userPageId?: string
    relations?: Array<{ id: string }>
  } = {
    authenticate: authenticate,
    logout: logout,
    isAuthenticated: isAuthenticated,
    user: user,
  }
  if (!userResponse.error && userResponse.data) {
    const user = userResponse.data as any
    const relations = user.properties.articles.relation as Array<{ id: string }>
    result = {
      ...result,
      userPageId: userResponse.data.id,
      relations: relations,
    }
  }

  return result
}
