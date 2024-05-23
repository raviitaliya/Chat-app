import { configureStore } from '@reduxjs/toolkit'
import counterReducer, { User } from './Slice'

export const store = configureStore({
  reducer: {
    user: counterReducer,
  },
})
export interface GlobalStore {
  user: User
}



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

