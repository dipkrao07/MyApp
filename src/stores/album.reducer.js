import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAlbumList } from '../api/albumAPI'

export const fetchAlbum = createAsyncThunk('user/getAlbum', async () => {
  const response = await getAlbumList()
  return response
})

const albumSlice = createSlice({
  name: 'albums',
  initialState: {
    isLoading: false,
    albumList: {}
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAlbum.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(fetchAlbum.fulfilled, (state, action) => {
        state.albumList = action.payload?.feed
        state.isLoading = false
      })
      .addCase(fetchAlbum.rejected, state => {
        state.isLoading = false
      })
  }
})

export default albumSlice.reducer
