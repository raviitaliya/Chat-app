import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './Slice'

export const store = configureStore({
  reducer: {
    user: counterReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
