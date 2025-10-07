import { configureStore } from '@reduxjs/toolkit'
import productTypesReducer from './productTypesSlice'

export const store = configureStore({
  reducer: {
    productTypes: productTypesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
