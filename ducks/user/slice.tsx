import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type UserState = {
  username: string | undefined
  userPageId: string | undefined
}

export const initialState: UserState = {
  username: undefined,
  userPageId: undefined,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (_) => ({
      username: undefined,
      userPageId: undefined,
    }),
    login: (_, action: PayloadAction<UserState>) => ({
      username: action.payload.username,
      userPageId: action.payload.userPageId,
    }),
  },
})

export default userSlice.reducer
