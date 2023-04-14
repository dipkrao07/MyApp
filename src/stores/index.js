import { configureStore } from '@reduxjs/toolkit'
import albumReducer from './album.reducer'

export const store = configureStore({
  reducer: {
    albumData: albumReducer
  }
})
